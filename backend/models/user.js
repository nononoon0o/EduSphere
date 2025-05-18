const mongoose = require("mongoose");

// 기본 스키마 옵션
const options = {
  discriminatorKey: "role",
  collection: "users",
};

// 기본 User 스키마 (공통 필드)
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    userID: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    school: { type: String },
    nickname: { type: String, default:"익명" },
    token: { type: String, default: "" },
    role: { type: String, enum: ['student', 'teacher'] }
  },
  options
);

// Student 스키마 (User 확장)
const studentSchema = new mongoose.Schema({
  classId: { type: String, required: true },
  studentNumber: { type: Number, required: true },
  subjects: [{ 
    name: String, 
    score: { type: Number, default: 0 }
  }]
});

// Teacher 스키마 (User 확장)
const teacherSchema = new mongoose.Schema({
  managedClasses: [{
    classId: String,
    subject: String
  }]
});

// 기본 모델 생성
const User = mongoose.model("User", userSchema);

// Discriminator 생성 (역할 값 명시)
const Student = User.discriminator("Student", studentSchema, { value: "student" });
const Teacher = User.discriminator("Teacher", teacherSchema, { value: "teacher" });

module.exports = { User, Student, Teacher };