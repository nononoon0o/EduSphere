const { User } = require("../../models/user"); // 기존 유저 모델 (회원 정보 저장용)

// 아이디 중복 확인 함수
const checkUserID = async (req, res) => {
  const { userID } = req.body; // 프론트에서 받은 userID

  try {
    // 아이디가 이미 존재하는지 확인 (기존 회원 데이터 확인)
    const existingUser = await User.findOne({ userID });

    if (existingUser) {
      return res.json({
        success: false,
        message: "이미 존재하는 아이디입니다.",
      });
    }

    // 아이디가 사용 가능할 경우, 세션에 userID 저장
    req.session.userID = userID; // 세션에 아이디 저장
    console.log(`세션에 저장된 이메일: ${req.session.email}`);
    console.log(`세션에 저장된 아이디: ${req.session.userID}`);

    // 아이디가 존재하지 않으면 사용 가능하다는 응답을 반환
    res.json({
      success: true,
      message: "사용 가능한 아이디입니다. 세션에 아이디가 저장되었습니다.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

module.exports = { checkUserID };
