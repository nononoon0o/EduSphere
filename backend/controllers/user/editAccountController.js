const bcrypt = require('bcrypt');
const { User } = require('../../models/user');

const editAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { nickname, school, password } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });

    if (nickname) user.nickname = nickname;
    if (school) user.school = school;
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    await user.save();
    return res.status(200).json({ success: true, message: '계정 정보가 수정되었습니다.' });
  } catch (err) {
    console.error('계정 정보 수정 오류:', err);
    return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
  }
};

module.exports = { editAccount };
