const express = require("express");
const router = express.Router();
const { signupPassword } = require("../../controllers/signup/pwController");

// 로그인 경로
router.post("/pw", signupPassword);

module.exports = router;
