const User = require("../../models/User");

require("dotenv").config();

async function getUsers() {
  return await User.find(); // 모든 사용자 정보 가져오기
}

const loadName = async (req, res) => {
  try {
    const userId = req.user.id; // 인증된 사용자 ID
    console.log("인증된 사용자 ID:", userId);
    // 사용자의 정보를 가져옴
    const user = await User.findById(userId, "nickname");
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    // nickname 값을 응답으로 전송
    console.log("조회된 닉네임:", user.nickname)
    return res.status(200).json({ nickname: user.nickname });
  } catch (error) {
    console.error("사용자 이름 로드 중 오류:", error.stack);
    return res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

module.exports = { getUsers, loadName };
