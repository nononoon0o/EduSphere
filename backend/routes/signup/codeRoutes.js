const express = require("express");
const router = express.Router();
const { verifyCode } = require("../../controllers/signup/codeController");

// 회원가입 경로
router.post("/code", verifyCode); // 인증코드 확인

module.exports = router;
