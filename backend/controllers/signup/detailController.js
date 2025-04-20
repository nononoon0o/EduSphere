const { User, Student, Teacher } = require("../../models/user");

const saveUserDetails = async (req, res) => {
  console.log("로그인 후 세션 userID:", req.session.userID);
  console.log("1세션에 저장된 password:", req.session.password);
  const sessionUserID = req.session.userID; // 세션에서 유저 아이디 가져오기
  if (!sessionUserID) {
    return res.status(401).json({ success: false, message: "로그인이 필요합니다." });
  }

  try {
    console.log("세션:", req.session);
    const existingUser = await User.findOne({ userID: sessionUserID });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "사용자를 찾을 수 없습니다." });
    }

    const { role, nickname, school, classId } = req.body;
    console.log("req.body:", req.body);
    console.log(req.body.role)
    console.log(req.body.nickname)
    console.log(req.body.school)
    console.log(req.body.classId)

    // 공통 필드 업데이트
    existingUser.email = req.session.email;
    existingUser.userID = req.session.userID;
    existingUser.password = req.session.password;
    existingUser.school = school;
    existingUser.nickname = nickname;
    existingUser.role = role;
    await existingUser.save();

    // 역할에 따라 분기
    if (role === "student") {
      await Student.findOneAndUpdate(
        { _id: existingUser._id },
        {
          $set: {
            assignedClasses: [{ classId }],
          },
        },
        { upsert: true, new: true }
      );
    } else if (role === "teacher") {
      await Teacher.findOneAndUpdate(
        { _id: existingUser._id },
        {
          $set: {
            classId,
          },
        },
        { upsert: true, new: true }
      );
    }

    return res.json({ success: true, message: "추가 정보가 저장되었습니다." });
  } catch (error) {
    console.error("User details 저장 중 오류:", error);
    return res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
  }
};

module.exports = { saveUserDetails };
