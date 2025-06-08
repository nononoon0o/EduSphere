const { Score } = require('../../models/score/score');
const { WeightSetting } = require('../../models/score/weightSetting');
const { Student } = require('../../models/user');

const getTotalScore = async (req, res) => {
  try {
    const { studentId, chapter } = req.params;
    const score = await Score.findOne({ student: studentId, chapter });
    if (!score) return res.status(404).json({ message: '점수 없음' });
    res.json({ totalScore: score.totalScore });
  } catch (e) {
    res.status(500).json({ message: '서버 오류', error: e.message });
  }
};

const getScoreDetails = async (req, res) => {
  try {
    const { studentId, chapter } = req.params;
    const score = await Score.findOne({ student: studentId, chapter });
    if (!score) return res.status(404).json({ message: '점수 없음' });
    res.json({
      quizScore: score.quizScore,
      attendanceScore: score.attendanceScore,
      assignmentScore: score.assignmentScore,
      totalScore: score.totalScore,
      weights: score.weights
    });
  } catch (e) {
    res.status(500).json({ message: '서버 오류', error: e.message });
  }
};

const updateWeights = async (req, res) => {
  try {
    const { school, classId } = req.params;
    const { quiz, attendance, assignment } = req.body;
    const total = Number(quiz) + Number(attendance) + Number(assignment);
    if (total !== 100) return res.status(400).json({ message: '합계가 100이 되어야 합니다.' });
    const weights = { quiz, attendance, assignment };

    const updated = await WeightSetting.findOneAndUpdate(
      { school, classId },
      { weights },
      { upsert: true, new: true }
    );
    res.json({ success: true, weights: updated.weights });
  } catch (e) {
    res.status(500).json({ message: '서버 오류', error: e.message });
  }
};

module.exports = { getTotalScore, getScoreDetails, updateWeights };