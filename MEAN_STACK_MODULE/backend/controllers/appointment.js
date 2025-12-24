const Appointment = require("../models/appointment");
const User = require("../models/user");

exports.createAppointment = (req, res, next) => {
  const appointment = new Appointment({
    patient_id: req.body.patient_id,
    booking_date: req.body.booking_date,
    appointment_date: req.body.app_date,
    appointment_time: req.body.app_time,
    doctor: req.body.doctor,
    condition: req.body.condition,
    status: req.body.status
  });
  appointment.save()
    .then(result => {
      res.status(201).json({
        message: "Appointment created!",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Appointment creation failed!"
      });
  });
}

exports.getAppointments = (req, res, next) => {
  // convert string to number
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const recordQuery = Appointment.aggregate([
    {
      $lookup:
      {
      from: User.collection.name,
      localField: "patient_id",
      foreignField: "_id",
      as: "user_details"
      }
    },
    {
      $lookup:
      {
      from: User.collection.name,
      localField: "doctor",
      foreignField: "_id",
      as: "doctor_details"
      }
    },
  ]);

  let fetchedAppointments;

  if(pageSize && currentPage) {
    recordQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  recordQuery
    .then(documents => {
      fetchedAppointments = documents;
      return Appointment.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Appointments fetched successfully!",
        appointments: fetchedAppointments,
        maxAppointments: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching records failed!"
      });
    });
};

exports.getRecord = (req, res, next) => {
  Record.findById(req.params.id).then(record => {
    if(record) {
      res.status(200).json(record);
    } else {
      res.status(404).json({message: 'Record not found!'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching record failed!"
    });
  });
};

exports.deleteRecord = (req, res, next) => {
  Record.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(
    result => {
      if(result.deletedCount > 0) {
        res.status(200).json({message: "Deletion successful!"});
      } else {
        res.status(401).json({message: "Not authorized!"});
      }
    }
  )
  .catch(error => {
    res.status(500).json({
      message: "Fetching records failed!"
    });
  });
};
