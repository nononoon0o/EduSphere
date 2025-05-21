const { Assignment } = require('../../models/participation/assignment');

// 과제 생성 (교사용)
const createAssignments = async (req, res) => {
  try {
    console.log('Raw request body:', req.body);
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).json({ success: true, assignment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
    console.log(err)
  }
};

// 과제 제출 (학생용)
const submitAssignment = async(req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ success: false, message: '과제를 찾을 수 없습니다.' });

    assignment.submissions.push({
      studentId: req.user.id,
      submittedAt: new Date(),
      fileUrl: req.body.fileUrl,
      score: null
    });

    await assignment.save();
    res.json({ success: true, assignment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 전체 과제 조회
const getAllAssignment = async(req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json(assignments); // 배열로 반환
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 특정 과제 조회
const getAssignmentById = async(req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ success: false, message: '과제를 찾을 수 없습니다.' });
    res.json({ success: true, assignment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 과제 삭제
const deleteAssignment = async(req, res) => {
  try {
    const deleted = await Assignment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: '과제를 찾을 수 없습니다.' });
    }
    res.status(200).json({ success: true, message: '과제가 삭제되었습니다.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createAssignments, getAllAssignment, submitAssignment, getAssignmentById, deleteAssignment };