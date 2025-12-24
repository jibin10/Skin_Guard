const Prescription = require("../models/prescription");
const Appointment = require("../models/appointment");

exports.createPrescription = (req, res, next) => {
  const appData = { status: 'closed' };
  Appointment.updateOne({ _id: req.body.appointment_id }, {$set: appData}).then(out => {
    if(out.matchedCount > 0) {
      const prescription = new Prescription({
        patient_id: req.body.patient_id,
        appointment_id: req.body.appointment_id,
        prescription: req.body.prescription,
        tests: req.body.tests
      });
      prescription.save()
        .then(result => {
          res.status(201).json({
            message: "Prescription created!",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "Prescription creation failed!"
          });
      });
    }
  });
}
