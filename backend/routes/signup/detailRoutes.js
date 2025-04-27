const express = require("express");
const router = express.Router();
const { saveUserDetails } = require("../../controllers/signup/detailController");

router.post("/details", saveUserDetails);

module.exports = router;
