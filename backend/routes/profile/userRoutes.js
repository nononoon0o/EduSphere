const express = require("express");
const router = express.Router();
const { loadName, loadRole } = require("../../controllers/user/userController");
const { authenticateToken } = require("../../middlewares/authenticate");

router.get("/name", authenticateToken, loadName);
router.get("/role", authenticateToken, loadRole);

module.exports = router;
