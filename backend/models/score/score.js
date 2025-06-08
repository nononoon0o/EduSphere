const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  chapter: { type: String, required: true },
  quizScore: { type: Number, default: 0 },
  attendanceScore: { type: Number, default: 0 },
  assignmentScore: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
  weights: {
    quiz: { type: Number, default: 40 },
    attendance: { type: Number, default: 30 },
    assignment: { type: Number, default: 30 },
  },
  updatedAt: { type: Date, default: Date.now }
});

scoreSchema.index({ student: 1, chapter: 1 }, { unique: true });

const Score = mongoose.model('Score', scoreSchema);

module.exports = { Score };