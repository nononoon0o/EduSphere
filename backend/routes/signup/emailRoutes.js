const express = require("express");
const router = express.Router();
const { checkEmail } = require("../../controllers/signup/emailController");

// 회원가입 경로
router.post("/email", checkEmail); // 이메일 확인 및 인증코드 발송

module.exports = router;
