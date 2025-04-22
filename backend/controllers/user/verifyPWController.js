const bcrypt = require("bcrypt");
const { User } = require("../../models/user");

const verifyPassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "사용자를 찾을 수 없습니다." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "비밀번호 불일치" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("비밀번호 확인 중 오류:", err);
    return res.status(500).json({ success: false, message: "서버 오류" });
  }
};

module.exports = { verifyPassword };
