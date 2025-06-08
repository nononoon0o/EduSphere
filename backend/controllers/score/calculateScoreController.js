const { Attendance } = require('../../models/participation/attendance');
const { Assignment } = require('../../models/participation/assignment');
const { WeightSetting } = require('../../models/score/weightSetting');
const { Student } = require('../../models/user');
const { Score } = require('../../models/score/score');

// 출결 점수 계산 함수
function calculateAttendanceScore(attendanceRecords) {
  // 예: 출석 10점, 지각 5점, 결석 0점
  if (!attendanceRecords || attendanceRecords.length === 0) return 0;
  let score = 0;
  attendanceRecords.forEach(record => {
    if (record.status === '출석') score += 10;
    else if (record.status === '지각') score += 5;
    // 결석은 0점, else nothing
  });
  // 출결 점수가 여러 번 있을 수 있으니 평균 등 규칙을 추가할 수 있음
  return score / attendanceRecords.length; // 예시: 평균점수
}

// 과제 점수 계산 함수
function calculateAssignmentScore(assignment, studentId) {
  if (!assignment || !assignment.submissions) return 0;
  const sub = assignment.submissions.find(s => s.studentId.toString() === studentId.toString());
  return sub && typeof sub.score === 'number' ? sub.score : 0;
}

// 평가 점수는 프론트에서 넘겨주는 값 그대로 사용 (혹은 서버에서 채점 기능이 있으면 서버에서 계산)

// 통합 점수 저장 컨트롤러
const autoScore = async (req, res) => {
  try {
    const { studentId, chapter, quizScore = 0 } = req.body;

    const existingScore = await Score.findOne({ student: studentId, chapter });
    if (existingScore && typeof existingScore.quizScore === 'number') {
      return res.status(409).json({ message: '이미 평가 점수가 저장되어 있습니다.' });
    }

    // 1. 학생 정보 및 가중치 불러오기
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: '학생을 찾을 수 없습니다.' });

    const weightDoc = await WeightSetting.findOne({ school: student.school, classId: student.classId });
    const weights = weightDoc ? weightDoc.weights : { quiz: 40, attendance: 30, assignment: 30 };

    // 2. 출결 기록 가져오기
    const attendanceRecords = await Attendance.find({ studentId, chapter });
    const attendanceScore = calculateAttendanceScore(attendanceRecords);

    // 3. 과제 기록 가져오기
    const assignment = await Assignment.findOne({ chapter });
    const assignmentScore = calculateAssignmentScore(assignment, studentId);

    // 4. totalScore 계산 (가중치 적용)
    const totalScore =
      quizScore * (weights.quiz / 100) +
      attendanceScore * (weights.attendance / 100) +
      assignmentScore * (weights.assignment / 100);

    // 5. Score 저장 (upsert)
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

module.exports = { autoScore };
