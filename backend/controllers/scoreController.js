const { Score } = require('../models/score/score');
const { WeightSetting } = require('../models/score/weightSetting');
const { Student } = require('../models/user');

const saveScore = async (req, res) => {
  try {
    const { studentId, chapter, quizScore, attendanceScore, assignmentScore } = req.body;

    // 1. 학생의 학교/반 정보 가져오기
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: '학생을 찾을 수 없습니다.' });

    // 2. 해당 학교/반에 맞는 weights 가져오기
    const weightDoc = await WeightSetting.findOne({ school: student.school, classId: student.classId });
    const weights = weightDoc
      ? weightDoc.weights
      : { quiz: 40, attendance: 30, assignment: 30 }; // 혹시 못 찾으면 기본값

    // 3. totalScore 계산
    const totalScore =
      quizScore * (weights.quiz / 100) +
      attendanceScore * (weights.attendance / 100) +
      assignmentScore * (weights.assignment / 100);

    // 4. 저장 (upsert)
    const score = await Score.findOneAndUpdate(
      { student: studentId, chapter },
      { quizScore, attendanceScore, assignmentScore, totalScore, weights, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    res.json({ success: true, score });
  } catch (e) {
    res.status(500).json({ message: '서버 오류', error: e.message });
  }
};

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

module.exports = { saveScore, getTotalScore, getScoreDetails, updateWeights };