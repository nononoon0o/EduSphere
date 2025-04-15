const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  deleteAccount,
} = require("../../controllers/signup/loginController");
const { authenticateToken } = require("../../middlewares/authenticate");

// 로그인 경로
router.post("/login", login);

// 로그아웃
router.post("/logout", authenticateToken, logout);

// 계정탈퇴
router.delete("/delete", authenticateToken, deleteAccount);

module.exports = router;
