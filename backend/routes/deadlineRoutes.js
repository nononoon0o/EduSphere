const express = require('express');
const router = express.Router();
const { setDeadline, getDeadline, getAllDeadlines} = require('../controllers/deadlineController');

// 데드라인 생성 또는 수정
router.post('/', setDeadline);

// 챕터별 데드라인 조회
router.get('/:chapter', getDeadline);

// 전체 데드라인 목록 조회 (선택)
router.get('/all', getAllDeadlines);

module.exports = router;