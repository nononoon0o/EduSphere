const { Attendance } = require('../../models/participation/attendance');

// 출결 생성
const createAttendance = async (req, res) => {
  try {
    const { studentId, chapter, date, status } = req.body;
    const attendance = new Attendance({ studentId, chapter, date, status });
    await attendance.save();
    res.status(201).json({ success: true, attendance });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 특정 학생 출결 조회
const getAttendanceByStudent = async (req, res) => {
  try {
    const records = await Attendance.find({ studentId: req.params.studentId });
    res.json({ success: true, records });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createAttendance, getAttendanceByStudent };
