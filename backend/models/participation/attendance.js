const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  chapter: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  status: { type: String, enum: ['출석', '지각'], required: true }
});

// 인덱스: 한 학생이 한 챕터에 한 번만 출석 기록을 남길 수 있도록
attendanceSchema.index({ studentId: 1, chapter: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = { Attendance };