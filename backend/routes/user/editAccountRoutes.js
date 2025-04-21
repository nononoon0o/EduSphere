const express = require('express');
const router = express.Router();
const { editAccount } = require('../../controllers/user/editAccountController');
const { authenticateToken } = require("../../middlewares/authenticate");

router.post('/account/edit', authenticateToken, editAccount);

module.exports = router;
