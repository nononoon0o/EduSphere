const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  chapter: { type: String, required: true },
  description: String,
  dueDate: Date,
  teafileId: mongoose.Schema.Types.ObjectId,
  submissions: [{
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    submittedAt: Date,
    stuTitle: String,
    stuContent: String,
    stufileUrl: String,
    score: Number
  }]
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = { Assignment };