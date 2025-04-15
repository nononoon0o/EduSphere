const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  userID: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, default: "" }, // 토큰값 저장
  nickname: { type: String, default: "익명" }, // 기본값 익명
  profileImage: { type: String, default: "" }, // 프로필 이미지 URL
});

module.exports = mongoose.model("User", userSchema, "users");
