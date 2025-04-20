const User = require("../../models/user");

require("dotenv").config();

const loadName = async (req, res) => {
  try {
    const userId = req.user.id; // 인증된 사용자 ID
    console.log("인증된 사용자 ID:", userId);
    
    // 먼저 User 컬렉션에서 role 조회
    const baseUser = await User.User.findById(userId);
    if (!baseUser) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    const role = baseUser.role;
    let user;

    if (role === "student") {
      user = await User.Student.findById(userId, "nickname");
    } else if (role === "teacher") {
      user = await User.Teacher.findById(userId, "nickname");
    } else {
      return res.status(400).json({ message: "유효하지 않은 사용자 역할입니다." });
    }

    if (!user) {
      return res.status(404).json({ message: "사용자 정보가 없습니다." });
    }

    // nickname 값을 응답으로 전송
    console.log("조회된 닉네임:", user.nickname)
    return res.status(200).json({ nickname: user.nickname });
  } catch (error) {
    console.error("사용자 이름 로드 중 오류:", error.stack);
    return res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

const loadRole = async (req, res) => {
  try {
    const userId = req.user.id;
    const baseUser = await User.User.findById(userId); // User.User 구조라면
    if (!baseUser) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    return res.status(200).json({ role: baseUser.role });
  } catch (error) {
    console.error("역할 로드 중 오류:", error.stack);
    return res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

module.exports = { loadName, loadRole };
