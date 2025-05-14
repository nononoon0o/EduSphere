const express = require('express');
const router = express.Router();
const { Student } = require('../../models/user'); // Student 모델 임포트
const { Attendance } = require('../../models/participation/attendance');
const { Assignment } = require('../../models/participation/assignment');
const { authenticateToken, teacherOnly } = require('../../middlewares/authenticate'); // JWT 인증 미들웨어

// 학생 전체 조회 (교사만)
router.get('/', authenticateToken, teacherOnly, async (req, res) => {
  try {
    const { classId, subjects } = req.query;
    const filter = {};

    if (classId) filter.classId = classId;
    if (subjects) {
      const subjectArr = subjects.split(',');
      filter['subjects.name'] = { $in: subjectArr };
    }

    const students = await Student.find(filter).select('-password -token');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
});

// 학생 상세 조회 (교사/학생 본인)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select('-password -token');
    if (!student) return res.status(404).json({ message: '학생을 찾을 수 없습니다.' });
    // (선택) 본인 또는 교사만 접근 가능하도록 추가 검증 가능
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
});

// 학생 생성 (교사만)
router.post('/', authenticateToken, teacherOnly, async (req, res) => {
  try {
    const { nickname, school, classId, studentNumber, subjects } = req.body;
    if (!nickname || !school || !classId || !studentNumber) {
      return res.status(400).json({ message: '필수 필드 누락' });
    }
    const existing = await Student.findOne({ studentNumber });
    if (existing) return res.status(400).json({ message: '이미 등록된 학번입니다.' });

    // subjects: ["과학", "수학"] 또는 "과학" → 객체 배열로 변환
    let subjectsArray = [];
    if (typeof subjects === 'string' && subjects.trim() !== '') {
      subjectsArray = subjects.split(',').map(name => ({ name: name.trim(), score: 0 }));
    } else if (Array.isArray(subjects)) {
      subjectsArray = subjects.map(name => ({ name: name.trim(), score: 0 }));
    }

    const newStudent = new Student({
      nickname,
      school,
      classId,
      studentNumber,
      subjects: subjectsArray
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
});

// 학생 정보 수정 (교사만)
router.put('/:id', authenticateToken, teacherOnly, async (req, res) => {
  try {
    const update = req.body;
    // subjects 변환 처리 (필요시)
    if (update.subjects) {
      if (typeof update.subjects === 'string') {
        update.subjects = update.subjects.split(',').map(name => ({ name: name.trim(), score: 0 }));
      } else if (Array.isArray(update.subjects)) {
        update.subjects = update.subjects.map(name => ({ name: name.trim(), score: 0 }));
      }
    }
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updatedStudent) return res.status(404).json({ message: '학생을 찾을 수 없습니다.' });
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
});

// 학생 삭제 (교사만)
router.delete('/:id', authenticateToken, teacherOnly, async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: '학생을 찾을 수 없습니다.' });
    res.json({ message: '학생이 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
});

router.get('/:id/results', authenticateToken, async (req, res) => {
  try {
    // 1. 학생 기본 정보 및 subjects
    const student = await Student.findById(req.params.id).select('subjects');
    if (!student) {
      return res.status(404).json({ message: '학생을 찾을 수 없습니다.' });
    }

    // 2. 출결 정보 (attendance 컬렉션에서 조회)
    const attendanceRecords = await Attendance.find({ studentId: req.params.id });
    // 출석/지각/결석 통계 집계
    const attendanceStats = { present: 0, late: 0, absent: 0 };
    attendanceRecords.forEach(rec => {
      if (rec.status === '출석') attendanceStats.present++;
      else if (rec.status === '지각') attendanceStats.late++;
      else if (rec.status === '결석') attendanceStats.absent++;
    });

    // 3. 과제 정보 (assignment 컬렉션에서 해당 학생의 제출 내역만 추출)
    const assignments = await Assignment.find({ 'submissions.studentId': req.params.id });
    const assignmentResults = assignments.map(ass => {
      const submission = ass.submissions.find(sub => sub.studentId.toString() === req.params.id);
      return {
        title: ass.title,
        status: submission ? '제출' : '미제출',
        score: submission ? submission.score : null
      };
    });

    // 4. 결과 합치기
    res.json({
      subjects: student.subjects || [],
      attendance: attendanceStats,
      assignments: assignmentResults
    });
  } catch (error) {
    console.error("학습 결과 조회 오류:", error);
    res.status(500).json({ message: '서버 내부 오류' });
  }
});


module.exports = router;
