const express = require('express');
const router = express.Router();
const { verifyPassword } = require('../../controllers/user/verifyPWController');
const { authenticateToken } = require('../../middlewares/authenticate');

router.post('/verifyPW', authenticateToken, verifyPassword);

module.exports = router;