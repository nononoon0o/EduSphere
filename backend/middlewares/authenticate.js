const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "토큰이 없습니다." });
  }

  // 'Bearer ' 문자열 제거하고 토큰만 추출
  const token = authHeader.split(" ")[1]; // Bearer 다음의 실제 토큰 부분만 추출

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "유효한 토큰이 포함되어 있지 않습니다.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // 토큰 검증
    req.user = decoded; // 사용자 정보 저장
    next(); // 다음 미들웨어로 이동
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res
        .status(403)
        .json({ success: false, message: "잘못된 토큰입니다." });
    }
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "토큰이 만료되었습니다." });
    }
    res.status(500).json({ success: false, message: "서버 오류 발생" });
  }
};

module.exports = { authenticateToken };
