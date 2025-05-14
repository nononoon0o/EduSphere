const User = require("../../models/user");
const bcrypt = require("bcrypt");

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
    const baseUser = await User.User.findById(userId);
    if (!baseUser) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    console.log("조회된 역할:", baseUser.role)
    return res.status(200).json({ role: baseUser.role });
  } catch (error) {
    console.error("역할 로드 중 오류:", error.stack);
    return res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

const loadMongoDBID = async (req, res) => {
  try {
    const userId = req.user.id;
    const baseUser = await User.User.findById(userId);
    if (!baseUser) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    console.log("조회된 몽고DB ID:", baseUser._id.toString())
    return res.status(200).json({ _id: baseUser._id.toString() });
  } catch (error) {
    console.error("몽고DB ID 로드 중 오류:", error.stack);
    return res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;
    console.log(userId)
    console.log(password)
    const user = await User.User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "사용자를 찾을 수 없습니다." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "비밀번호 불일치" });
    }
    // 여기서 실제 삭제
    await User.User.findByIdAndDelete(userId);
    console.log("회원 탈퇴 완료")
    return res.status(200).json({ success: true, message: "회원 탈퇴가 완료되었습니다." });
  } catch (err) {
    console.error("회원 탈퇴 중 오류:", err);
    return res.status(500).json({ success: false, message: "서버 오류" });
  }
};

module.exports = { loadName, loadRole, loadMongoDBID, deleteUser };
