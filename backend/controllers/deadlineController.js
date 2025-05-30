const { Deadline } = require('../models/deadline');

const setDeadline = async (req, res) => {
  try {
    const { chapter, deadline } = req.body;
    if (!chapter || !deadline) {
      return res.status(400).json({ success: false, message: 'chapter와 deadline이 필요합니다.' });
    }
    const updated = await Deadline.findOneAndUpdate(
      { chapter },
      { chapter, deadline: new Date(deadline) },
      { new: true, upsert: true }
    );
    res.json({ success: true, deadline: updated });
    console.log("데드라인 저장 완료");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDeadline = async (req, res) => {
  try {
    const { chapter } = req.params;
    const found = await Deadline.findOne({ chapter });
    if (!found) {
      return res.status(404).json({ success: false, message: '데드라인이 없습니다.' });
    }
    res.json({ success: true, deadline: found });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllDeadlines = async (req, res) => {
  try {
    const deadlines = await Deadline.find();
    console.log(deadlines);
    res.json({ success: true, deadlines });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { setDeadline, getDeadline, getAllDeadlines }