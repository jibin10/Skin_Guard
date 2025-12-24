const User = require("../models/user");
const Appointment = require("../models/appointment");
const QuickTest = require("../models/quick_test");
const AdvancedTest = require("../models/advanced_test");

exports.getPRecords = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const prQuery = User.aggregate([
    { $match : { role : "Patient" } },
    {
      $lookup:
      {
      from: Appointment.collection.name,
      localField: "_id",
      foreignField: "patient_id",
      as: "appointment_details"
      }
    },
    {
      $lookup:
      {
      from: QuickTest.collection.name,
      localField: "_id",
      foreignField: "patient_id",
      as: "quick_test"
      }
    },
    {
      $lookup:
      {
      from: AdvancedTest.collection.name,
      localField: "_id",
      foreignField: "patient_id",
      as: "adv_test"
      }
    }]).sort({'_id': -1});

  let fetchedPR;
  if(pageSize && currentPage) {
    prQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  prQuery
    .then(documents => {
      fetchedPR = documents;
      return User.count({ role : "Patient" });
    })
    .then(count => {
      res.status(200).json({
        message: "Invoices fetched successfully!",
        patient_records: fetchedPR,
        maxPR: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching invoice failed!"
      });
    });
};
