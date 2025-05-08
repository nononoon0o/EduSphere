const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  subject: String,
  dueDate: Date,
  submissions: [{
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    submittedAt: Date,
    fileUrl: String,
    score: Number
  }]
});

module.exports = mongoose.model('Assignment', assignmentSchema);
