const { User } = require("../../models/user"); // 기존 유저 모델 (회원 정보 저장용)
const VerificationCode = require("../../models/VerificationCode"); // 인증코드 저장을 위한 모델
const nodemailer = require("nodemailer");
require("dotenv").config(); // .env 파일에서 환경 변수 로드

// 이메일 인증코드 생성 함수 (6자리 숫자)
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 숫자 생성
};

// Gmail 메일 설정
let transporter = nodemailer.createTransport({
  service: "gmail", // Gmail SMTP 서버 사용
  auth: {
    user: process.env.GMAIL_EMAIL, // .env 파일에서 이메일 가져오기
    pass: process.env.GMAIL_PASSWORD, // .env 파일에서 앱 비밀번호 가져오기
  },
});

// 이메일 전송 함수
const sendVerificationEmail = async (email, verificationCode) => {
  let mailOptions = {
    from: process.env.GMAIL_EMAIL, // 발신자 이메일 주소
    to: email, // 수신자 이메일 주소
    subject: "이메일 인증코드 확인", // 이메일 제목
    text: `이메일 인증을 위한 코드: ${verificationCode}`, // 이메일 본문
  };

  try {
    // 이메일 전송
    await transporter.sendMail(mailOptions);
    console.log("이메일이 성공적으로 전송되었습니다.");
  } catch (error) {
    console.error("이메일 전송 중 오류가 발생했습니다:", error);
    if (error.responseCode === 550) {
      console.log("존재하지 않는 이메일 주소입니다.");
    }
  }
};

// 이메일 중복 확인 및 인증코드 전송 함수
const checkEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // 이메일이 이미 존재하는지 확인 (기존 회원 데이터 확인)
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "이미 존재하는 이메일입니다.",
      });
    }

    // 기존 인증코드가 있으면 삭제 (재전송 시 이전 인증코드 삭제)
    await VerificationCode.deleteOne({ email });

    // 새로운 인증코드 생성
    const verificationCode = generateVerificationCode();

    // 새 인증코드를 데이터베이스에 저장 (5분 후 만료)
    const newVerificationCode = new VerificationCode({
      email: email,
      code: verificationCode,
      createdAt: Date.now(), // 생성 시간 저장
      expiresAt: Date.now() + 5 * 60 * 1000, // 5분(300초) 후 만료
    });

    await newVerificationCode.save(); // 데이터베이스에 저장

    // 이메일로 인증코드 전송
    await sendVerificationEmail(email, verificationCode);

    res.json({
      success: true,
      message: "사용 가능한 이메일입니다. 인증코드를 확인해주세요.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

module.exports = { checkEmail };
