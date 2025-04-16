//const User = require("../../models/User"); // 기존 유저 모델 (회원 정보 저장용)
const VerificationCode = require("../../models/VerificationCode"); // 인증코드 저장을 위한 모델
require("dotenv").config(); // .env 파일에서 환경 변수 로드

// 인증코드 확인 함수
const verifyCode = async (req, res) => {
  const { email, code } = req.body;
  try {
    // 데이터베이스에서 해당 이메일의 인증코드 찾기
    const existingCode = await VerificationCode.findOne({ email });
    if (!existingCode) {
      return res.json({
        success: false,
        message: "인증코드가 없습니다. 다시 시도해주세요.",
      });
    }

    // 프론트에서 받은 인증코드와 DB에 저장된 인증코드를 콘솔에 출력
    console.log(`프론트에서 받은 인증코드: ${code}`);
    console.log(`DB에 저장된 인증코드: ${existingCode.code}`);

    // 인증코드가 만료되었는지 확인
    if (existingCode.expiresAt < Date.now()) {
      return res.json({
        success: false,
        message: "인증코드가 만료되었습니다. 다시 요청해주세요.",
      });
    }

    // 인증코드가 일치하는지 확인
    if (existingCode.code !== code) {
      return res.json({
        success: false,
        message: "인증코드가 일치하지 않습니다.",
      });
    }

    // 인증 성공 시, 세션에 이메일 저장
    req.session.email = email; // 세션에 이메일 값 추가
    console.log(`세션에 저장된 이메일: ${req.session.email}`);

    // 인증 성공 응답
    res.json({
      success: true,
      message: "인증코드가 확인되었습니다. 세션에 이메일이 저장되었습니다.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

module.exports = { verifyCode };
