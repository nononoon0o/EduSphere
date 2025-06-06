const { Assignment } = require('../../models/participation/assignment');
const mongoose = require('mongoose');
const { uploadFileToGridFS, getFileFromGridFS } = require('../../middlewares/upload');
const { GridFSBucket } = require('mongodb');

// 과제 생성 (교사용)
const createAssignments = async (req, res) => {
  try {
    let teafileId = null;
    if (req.file) {
      const fileStream = req.file.buffer;
      const decodedFileName = Buffer.from(req.file.originalname, 'latin1').toString('utf8');
      teafileId = await uploadFileToGridFS(fileStream, decodedFileName);
    }
    console.log('Raw request body:', req.body);
    const assignment = new Assignment({
      ...req.body,
      teafileId
    });
    await assignment.save();
    res.status(201).json({ success: true, assignment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
    console.log(err)
  }
};

// 과제 제출 (학생용)
const submitAssignment = async(req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ success: false, message: '과제를 찾을 수 없습니다.' });

    assignment.submissions.push({
      studentId: req.user.id,
      submittedAt: new Date(),
      stuTitle: req.body.stuTitle,
      stuContent: req.body.stuContent,
      stufileUrl: req.body.stufileUrl,
      score: null
    });

    await assignment.save();
    res.json({ success: true, assignment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 전체 과제 조회
const getAllAssignment = async(req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json(assignments); // 배열로 반환
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 특정 과제 조회
const getAssignmentById = async(req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ success: false, message: '과제를 찾을 수 없습니다.' });
    res.json({ success: true, assignment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 과제 삭제
const deleteAssignment = async(req, res) => {
  try {
    const deleted = await Assignment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: '과제를 찾을 수 없습니다.' });
    }

    if (deleted.teafileId) {
      const gridFSBucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'assignments' });
      await gridFSBucket.delete(new mongoose.Types.ObjectId(deleted.teafileId));
    }

    await Assignment.findByIdAndDelete(req.params.id);

    return res.status(200).json({ success: true, message: '과제가 삭제되었습니다.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
    console.log(err);
  }
};

// 과제 파일 다운로드
const downloadFile = async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.fileId);
    
    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'assignments' });
    const files = await bucket.find({ _id: fileId }).toArray();
    if (files.length === 0) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    const filename = files[0].filename;
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);    
    console.log(res)
    
    const downloadStream = getFileFromGridFS(fileId);
    downloadStream.pipe(res);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createAssignments, getAllAssignment, submitAssignment, getAssignmentById, deleteAssignment, downloadFile };