const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../../middlewares/authenticate");
const { createAttendance, getAttendanceByStudent } = require('../../controllers/participation/attendanceController');

router.post('/', authenticateToken, createAttendance);

router.get('/student/:studentId', authenticateToken, getAttendanceByStudent);

module.exports = router;
