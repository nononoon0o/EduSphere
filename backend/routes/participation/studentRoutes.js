const express = require('express');
const router = express.Router();
const { Student } = require('../../models/user'); // Student 모델 임포트
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

module.exports = router;
