const express = require('express');
const router = express.Router();
const deadlineController = require('../controllers/deadlineController');

// 데드라인 생성 또는 수정
router.post('/', deadlineController.setDeadline);

// 챕터별 데드라인 조회
router.get('/:chapter', deadlineController.getDeadline);

// 전체 데드라인 목록 조회 (선택)
router.get('/all', deadlineController.getAllDeadlines);

module.exports = router;