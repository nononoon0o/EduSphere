const mongoose = require('mongoose');

const weightSettingSchema = new mongoose.Schema({
  school: { type: String, required: true },
  classId: { type: String, required: true },
  weights: {
    quiz: { type: Number, default: 40 },
    attendance: { type: Number, default: 30 },
    assignment: { type: Number, default: 30 }
  }
});

weightSettingSchema.index({ school: 1, classId: 1 }, { unique: true });

const WeightSetting = mongoose.model('WeightSetting', weightSettingSchema);

module.exports = { WeightSetting }