const express = require("express");
const router = express.Router();
const { loadName, loadRole, deleteUser } = require("../../controllers/user/userController");
const { authenticateToken } = require("../../middlewares/authenticate");

router.get("/name", authenticateToken, loadName);
router.get("/role", authenticateToken, loadRole);
router.delete("/delete", authenticateToken, deleteUser);

module.exports = router;
