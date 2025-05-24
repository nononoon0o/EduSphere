const express = require('express');
const router = express.Router();
const { upload } = require('../../middlewares/upload');
const { authenticateToken } = require("../../middlewares/authenticate");
const { createAssignments, getAllAssignment, getAssignmentById, submitAssignment, deleteAssignment, downloadFile } = require("../../controllers/participation/assignmentController")

// 과제 생성 (교사용)
router.post('/', upload.single('teafileUrl'), authenticateToken, createAssignments);

// 전체 과제 조회
router.get('/', authenticateToken, getAllAssignment);

// 특정 과제 조회
router.get('/:id', authenticateToken, getAssignmentById);

// 과제 제출 (학생용)
router.post('/:id/submit', authenticateToken, submitAssignment);

// 과제 삭제
router.delete('/:id', authenticateToken, deleteAssignment);

// 과제 다운로드
router.get('/files/:fileId', authenticateToken, downloadFile);

module.exports = router;