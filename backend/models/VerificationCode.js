const mongoose = require("mongoose");

const verificationCodeSchema = new mongoose.Schema({
  email: { type: String, required: true }, // 이메일 주소
  code: { type: String, required: true }, // 인증코드
  createdAt: { type: Date, default: Date.now }, // 생성된 시간
  expiresAt: { type: Date }, // 만료 시간
});

// 인증코드가 만료되면 자동 삭제 (옵션)
verificationCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("VerificationCode", verificationCodeSchema);
