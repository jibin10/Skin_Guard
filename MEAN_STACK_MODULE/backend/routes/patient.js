const express = require("express");
const PatientController = require("../controllers/patient");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get('/list_pr', checkAuth, PatientController.getPRecords);

module.exports = router;
