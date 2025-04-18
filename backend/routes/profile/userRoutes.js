const express = require("express");
const router = express.Router();
const { loadName } = require("../../controllers/user/userController");
const { authenticateToken } = require("../../middlewares/authenticate");

router.get("/name", authenticateToken, loadName);

module.exports = router;
