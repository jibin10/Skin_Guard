const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require("./routes/user");
const inspectRoutes = require("./routes/inspect");
const appointmentRoutes = require("./routes/appointment");
const patientRoutes = require("./routes/patient");
const prescriptionRoutes = require("./routes/prescription");

const app = express();

mongoose.connect("mongodb+srv://cl0_user:" +
process.env.MONGO_ATLAS_PW +
"@cluster0.zqhpfe0.mongodb.net/skin-guard-db")
  .then(() => {
    console.log("Connected to the database!");
  })
  . catch(() => {
    console.log("Connection failed!");
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/ml_models', express.static(path.join("backend/ml_models")));
app.use('/patient_images', express.static(path.join("backend/patient_images")));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/user', userRoutes);
app.use('/api/inspect', inspectRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/prescription', prescriptionRoutes);

module.exports = app;
