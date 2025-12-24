const express = require("express");

const AppointmentController = require("../controllers/appointment");
const UserController = require("../controllers/user");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post('/create', checkAuth, AppointmentController.createAppointment);

router.get('', checkAuth, AppointmentController.getAppointments);

router.get("/all_doctors", UserController.getDoctors);

router.delete('/:id', checkAuth, AppointmentController.deleteRecord);

module.exports = router;
