const bcrypt = require("bcrypt");
const User = require("../../models/User"); // User 모델

// 비밀번호 입력 후 최종 회원가입 처리
const signupPassword = async (req, res) => {
  console.log(`1`);
  const {
    password,
    nickname = "익명",
    profileImage = "",
    bio = "",
    interests = [],
    favoriteAIServices = [],
  } = req.body;

  // 세션에 저장된 이메일과 아이디 확인
  const email = req.session.email;
  const userID = req.session.userID;
  console.log(`2`);
  if (!email || !userID) {
    console.log(`3${email}`);
    console.log(`3${userID}`);
    return res.status(400).json({
      success: false,
      message:
        "이메일과 아이디 정보가 누락되었습니다. 이전 단계로 돌아가 다시 시도하세요.",
    });
  }
  console.log(`4`);
  try {
    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`5`);

    // 사용자 정보 데이터베이스에 저장
    const newUser = new User({
      email: email,
      userID: userID,
      password: hashedPassword,
      nickname, // 기본값 또는 req.body에서 전달된 값 사용
      profileImage, // 기본값 또는 req.body에서 전달된 값 사용
      bio, // 기본값 또는 req.body에서 전달된 값 사용
      interests, // 기본값 또는 req.body에서 전달된 값 사용
      favoriteAIServices, // 기본값 또는 req.body에서 전달된 값 사용
    });
    console.log(`6`);

    await newUser.save(); // 데이터베이스에 저장

    // 회원가입 완료 후 세션 종료 (안전한 로그아웃 처리)
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "세션 종료에 실패했습니다. 다시 시도해주세요.",
        });
      }
      res.json({
        success: true,
        message: "회원가입이 완료되었습니다.",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다. 다시 시도해주세요.",
    });
  }
};

module.exports = { signupPassword };
