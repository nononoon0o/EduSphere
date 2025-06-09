const express = require('express');
const router = express.Router();
const { upload } = require('../../middlewares/upload');
const { authenticateToken } = require("../../middlewares/authenticate");
const { createAssignments, getAllAssignment, getAssignmentById, submitAssignment, deleteAssignment, downloadFile, gradeAssignment, getSubmissionByStudent, createAssignmentScore } = require("../../controllers/participation/assignmentController")

// 과제 생성 (교사용)
router.post('/', upload.single('teafileUrl'), authenticateToken, createAssignments);

// 과제 점수 부여
router.post('/:id/submission/:studentId', authenticateToken, createAssignmentScore)

// 전체 과제 조회
router.get('/', authenticateToken, getAllAssignment);

// 과제 다운로드
router.get('/files/:fileId', authenticateToken, downloadFile);

// 학생 제출물 조회
router.get('/:assignmentId/submission/:studentId', authenticateToken, getSubmissionByStudent);

// 학생 과제 점수(채점) 입력/수정
router.patch('/:assignmentId/grade/:studentId', authenticateToken, gradeAssignment);

// 과제 제출 (학생용)
router.post('/:id/submit', upload.single('stufileUrl'), authenticateToken, submitAssignment);

// 과제 삭제
router.delete('/:id', authenticateToken, deleteAssignment);

// 특정 과제 조회
router.get('/:id', authenticateToken, getAssignmentById);

module.exports = router;