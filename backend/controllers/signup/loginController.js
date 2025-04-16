const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const login = async (req, res) => {
  const { userID, password } = req.body;
  console.log("Loaded JWT Secret:", process.env.JWT_SECRET); // 디버깅
  try {
    console.log("입력된 userID:", userID);
    console.log("입력된 password:", password);

    // 사용자 확인
    const user = await User.findOne({ userID });
    console.log("데이터베이스에서 찾은 사용자:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "존재하지 않는 사용자입니다.",
      });
    }

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { id: user._id, userID: user.userID }, // payload
      process.env.JWT_SECRET, // 비밀키
      { expiresIn: "1h" } // 만료 시간
    );
    console.log("Received Token from Client:", token);

    // 토큰을 데이터베이스에 저장
    user.token = token;
    await user.save();

    // 응답
    res.status(200).json({
      success: true,
      message: "로그인 성공",
      token, // 프론트엔드에 전달
      user: { userID: user.userID, email: user.email, nickname: user.nickname },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

// 로그아웃
const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    console.log("로그아웃 요청에서 받은 토큰:", token);

    if (!token) {
      console.error("토큰이 없습니다.");
      return res
        .status(401)
        .json({ success: false, message: "인증되지 않은 사용자입니다." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("토큰 디코딩 결과:", decoded);

    const userID = decoded.id;

    const user = await User.findById(userID);
    console.log("데이터베이스에서 찾은 사용자:", user);

    if (!user) {
      console.error("사용자를 찾을 수 없습니다.");
      return res
        .status(404)
        .json({ success: false, message: "사용자를 찾을 수 없습니다." });
    }

    user.token = null;
    await user.save();
    console.log("토큰이 제거되었습니다.");

    res.status(200).json({ success: true, message: "로그아웃 성공" });
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

// 회원탈퇴
const deleteAccount = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    console.log("회원탈퇴 요청에서 받은 토큰:", token);

    if (!token) {
      console.error("토큰이 없습니다.");
      return res
        .status(401)
        .json({ success: false, message: "인증되지 않은 사용자입니다." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("토큰 디코딩 결과:", decoded);

    const tokenUserID = decoded.id;

    const user = await User.findById(tokenUserID);
    console.log("데이터베이스에서 찾은 사용자:", user);

    if (!user) {
      console.error("사용자를 찾을 수 없습니다.");
      return res
        .status(404)
        .json({ success: false, message: "사용자를 찾을 수 없습니다." });
    }

    // 사용자 삭제
    await User.findByIdAndDelete(tokenUserID);
    console.log("사용자가 성공적으로 삭제되었습니다.");

    res
      .status(200)
      .json({ success: true, message: "회원탈퇴가 완료되었습니다." });
  } catch (error) {
    console.error("회원탈퇴 중 오류 발생:", error);
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

module.exports = { login, logout, deleteAccount };
