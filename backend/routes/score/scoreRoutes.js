const express = require('express');
const router = express.Router();
const { getTotalScore, getScoreDetails, updateWeights } = require('../../controllers/score/scoreController');
const { authenticateToken } = require('../../middlewares/authenticate');
const { autoScore } = require('../../controllers/score/calculateScoreController')

router.post('/', authenticateToken, autoScore);

router.put('/weight/:school/:classId', authenticateToken, updateWeights);

router.get('/:studentId/:chapter/total', authenticateToken, getTotalScore);

router.get('/:studentId/:chapter', authenticateToken, getScoreDetails);

module.exports = router;