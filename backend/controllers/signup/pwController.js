const bcrypt = require("bcrypt");
const { User } = require("../../models/user"); // User 모델

// 비밀번호 입력
const signupPassword = async (req, res) => {
  console.log(`1`);
  const {
    password,
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
  // 비밀번호 해시화
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(`5`);

  try {
    // 🔥 여기서 DB에 유저 저장
    const existingUser = await User.findOne({ userID });

    if (!existingUser) {
      const newUser = new User({
        email,
        userID,
        password: hashedPassword,
      });

      await newUser.save();
      console.log("✅ 새로운 유저가 DB에 저장되었습니다.");
    } else {
      console.log("⚠️ 이미 존재하는 유저입니다. 저장 생략.");
    }
    
    req.session.password = hashedPassword;
    console.log("세션에 저장된 password:", req.session.password);

    res.json({
      success: true,
      message: "비밀번호 입력 및 유저 저장이 완료되었습니다.",
    });
  } catch (error) {
    console.error("❌ 유저 저장 중 오류:", error);
    res.status(500).json({
      success: false,
      message: "서버 오류로 인해 유저 저장에 실패했습니다.",
    });
  }
};

module.exports = { signupPassword };
