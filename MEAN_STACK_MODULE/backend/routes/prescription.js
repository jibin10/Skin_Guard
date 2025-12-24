const express = require("express");

const PrescriptionController = require("../controllers/prescription");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post('/create', checkAuth, PrescriptionController.createPrescription);

module.exports = router;
