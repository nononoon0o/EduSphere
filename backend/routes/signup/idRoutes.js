const express = require("express");
const router = express.Router();
const { checkUserID } = require("../../controllers/signup/idController");

// 회원가입 경로
router.post("/id", checkUserID); // 인증코드 확인

module.exports = router;
