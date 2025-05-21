const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../../middlewares/authenticate");
const { createAssignments, getAllAssignment, getAssignmentById, submitAssignment, deleteAssignment } = require("../../controllers/participation/assignmentController")

// 과제 생성 (교사용)
router.post('/', authenticateToken, createAssignments);

// 전체 과제 조회
router.get('/', authenticateToken, getAllAssignment);

// 특정 과제 조회
router.get('/:id', authenticateToken, getAssignmentById);

// 과제 제출 (학생용)
router.post('/:id/submit', authenticateToken, submitAssignment);

// 과제 삭제
router.delete('/:id', authenticateToken, deleteAssignment);

module.exports = router;
