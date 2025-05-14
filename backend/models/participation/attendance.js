const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subject: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  status: { type: String, enum: ['출석', '결석', '지각'], required: true }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = { Attendance };