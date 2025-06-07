const { Student } = require('../../models/user');
const { Attendance } = require('../../models/participation/attendance');
const { Assignment } = require('../../models/participation/assignment');

// 전체 학생 조회
const getAllStudents = async (req, res) => {
  try {
    const { classId, subjects } = req.query;
    const filter = {};
    if (classId) filter.classId = classId;
    if (subjects) filter['subjects.name'] = { $in: subjects.split(',') };
    const students = await Student.find(filter).select('-password -token');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
};

// 단일 학생 조회
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select('-password -token');
    if (!student) return res.status(404).json({ message: '학생을 찾을 수 없습니다.' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
};

// 학생 등록
const createStudent = async (req, res) => {
  try {
    const { nickname, school, classId, studentNumber, subjects } = req.body;
    if (!nickname || !school || !classId || !studentNumber) {
      return res.status(400).json({ message: '필수 필드 누락' });
    }

    const existing = await Student.findOne({ studentNumber });
    if (existing) return res.status(400).json({ message: '이미 등록된 학번입니다.' });

    const subjectsArray = Array.isArray(subjects)
      ? subjects.map(name => ({ name: name.trim(), score: 0 }))
      : (subjects || '').split(',').map(name => ({ name: name.trim(), score: 0 }));

    const newStudent = new Student({ nickname, school, classId, studentNumber, subjects: subjectsArray });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
};

// 학생 정보 수정
const updateStudent = async (req, res) => {
  try {
    const update = req.body;
    if (update.subjects) {
      update.subjects = Array.isArray(update.subjects)
        ? update.subjects.map(name => ({ name: name.trim(), score: 0 }))
        : update.subjects.split(',').map(name => ({ name: name.trim(), score: 0 }));
    }
    const updated = await Student.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) return res.status(404).json({ message: '학생을 찾을 수 없습니다.' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
};

// 학생 삭제
const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: '학생을 찾을 수 없습니다.' });
    res.json({ message: '학생이 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
};

// 학생 결과 조회
const getStudentResults = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select('subjects');
    if (!student) return res.status(404).json({ message: '학생을 찾을 수 없습니다.' });

    const attendanceRecords = await Attendance.find({ studentId: req.params.id });
    const stats = { present: 0, late: 0, absent: 0 };
    attendanceRecords.forEach(r => {
      if (r.status === '출석') stats.present++;
      else if (r.status === '지각') stats.late++;
      else if (r.status === '결석') stats.absent++;
    });

    const assignments = await Assignment.find();
    const assignmentResults = assignments.map(ass => {
      const sub = ass.submissions.find(s => s.studentId.toString() === req.params.id);
      return {
        title: ass.title,
        status: sub ? '제출' : '미제출',
        score: sub ? sub.score : null
      };
    });

    res.json({ subjects: student.subjects, attendance: stats, assignments: assignmentResults });
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentResults
};
