const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentResults
} = require('../../controllers/participation/studentController');
const { authenticateToken, teacherOnly } = require('../../middlewares/authenticate');

router.get('/', authenticateToken, teacherOnly, getAllStudents);
router.get('/:id', authenticateToken, getStudentById);
router.post('/', authenticateToken, teacherOnly, createStudent);
router.put('/:id', authenticateToken, teacherOnly, updateStudent);
router.delete('/:id', authenticateToken, teacherOnly, deleteStudent);
router.get('/:id/results', authenticateToken, getStudentResults);

module.exports = router;