const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');
const { Readable } = require('stream');

let gridFSBucket;

// MongoDB 연결 후 GridFSBucket 초기화
mongoose.connection.once('open', () => {
  gridFSBucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: 'assignments'
  });
});

// 메모리 저장소로 multer 설정
const upload = multer({ storage: multer.memoryStorage() });

const uploadFileToGridFS = async (fileBuffer, filename) => {
  return new Promise((resolve, reject) => {
    const uploadStream = gridFSBucket.openUploadStream(filename);
    const bufferStream = new Readable();
    bufferStream.push(fileBuffer);
    bufferStream.push(null);
    bufferStream.pipe(uploadStream)
    .on('error', reject)
    .on('finish', () => resolve(uploadStream.id));
  });
};

const getFileFromGridFS = (fileId) => gridFSBucket.openDownloadStream(fileId)

module.exports = { upload, uploadFileToGridFS, getFileFromGridFS };
