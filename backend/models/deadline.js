const mongoose = require('mongoose');

const deadlineSchema = new mongoose.Schema({
  chapter: { type: String, required: true },
  deadline: { type: Date }
});

const Deadline = mongoose.model('Deadline', deadlineSchema);

module.exports = { Deadline };