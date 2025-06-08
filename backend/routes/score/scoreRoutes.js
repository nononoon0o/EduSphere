const express = require('express');
const router = express.Router();
const { saveScore, getTotalScore, getScoreDetails, updateWeights } = require('../../controllers/scoreController');
const { authenticateToken } = require('../../middlewares/authenticate');

router.post('/', authenticateToken, saveScore);

router.put('/weight/:school/:classId', authenticateToken, updateWeights);

router.get('/:studentId/:chapter/total', authenticateToken, getTotalScore);

router.get('/:studentId/:chapter', authenticateToken, getScoreDetails);

module.exports = router;