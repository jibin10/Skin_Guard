const Record = require("../models/record");
const QuickTest = require("../models/quick_test");
const AdvancedTest = require("../models/advanced_test");

const tf = require('@tensorflow/tfjs');
const tfnode = require('@tensorflow/tfjs-node')


const fs = require('fs');

var predVal = 0.0;
// read the image and convert to tensor
const readImage = path => {
  // read the image file
  const imageBuffer = fs.readFileSync(path);
  // decode the image file to tensor
  const tfimage = tfnode.node.decodeImage(imageBuffer, 3);
  // expand dimension
  const new_tfimage = tfimage.expandDims(0);
  // normalise the tensor and return it
  var new_tfimage_255 = new_tfimage.toFloat().div(tf.scalar(255.0));

  return new_tfimage_255;
}
const imageClassification = async path => {

  const image = readImage(__dirname + "/../patient_images/" + path);
  // load the json model
  const model = await tfnode.loadLayersModel('http://localhost:3000/ml_models/sg_model_1/model.json');
  // Prediction
  const prediction = await model.predict(image);
  // get the tensor prediction as a float32array
  const res = prediction.dataSync();
  console.log("Float32Array: ", res)

  // convert the float32array to array
  return await Array.from(res)
}

exports.createRecord = (req, res, next) => {

  const url = req.protocol + '://' + req.get("host");
  var pred = imageClassification(req.file.filename);
  pred.then(function (result) {
    console.log("Prediction: ", result[0])
    const record = new Record({
      patient: req.body.patient,
      details: req.body.details,
      skin_result: result[0],
      imagePath: url + '/patient_images/' + req.file.filename,
      creator: req.userData.userId
    });

    record.save().then(createdRecord => {
      res.status(201).json({
        message: 'Record added successfully',
        record: {
          ...createdRecord,
          id: createdRecord._id
        }
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Creating record failed!"
      });
    });
  });
};

exports.createQTRecord = (req, res, next) => {

  const url = req.protocol + '://' + req.get("host");
  var pred = imageClassification(req.file.filename);
  pred.then(function (result) {
    console.log("Prediction: ", result[0])
    const qt_record = new QuickTest({
      patient_id: req.body.userId,
      appointment_id: req.body.appId,
      test_date: req.body.test_date,
      details: req.body.details,
      test_result: result[0],
      imagePath: url + '/patient_images/' + req.file.filename,
    });

    qt_record.save().then(createdQTRecord => {
      res.status(201).json({
        message: 'QT Record added successfully',
        qt_record: {
          ...createdQTRecord,
          id: createdQTRecord._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating qt record failed!"
      });
    });
  });
};

exports.createAdvRecord = (req, res, next) => {

  const url = req.protocol + '://' + req.get("host");
  const adv_record = new AdvancedTest({
    patient_id: req.body.userId,
    appointment_id: req.body.appId,
    test_date: req.body.test_date,
    details: req.body.details,
    EfficientNetB7: req.body.EfficientNetB7,
    VGG19: req.body.VGG19,
    Inceptionv3: req.body.Inceptionv3,
    Xception: req.body.Xception,
    ResNet50: req.body.ResNet50,
    MobileNetV3: req.body.MobileNetV3,
    LabResult: null,
    imagePath: url + '/patient_images/' + req.file.filename,
  });
  adv_record.save().then(createdAdvRecord => {
    res.status(201).json({
      message: 'Adv Record added successfully',
      adv_record: {
        ...createdAdvRecord,
        id: createdAdvRecord._id
      }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Creating adv record failed!"
    });
  });
};

exports.updateRecord = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + '/patient_images/' + req.file.filename;
  }
  const record = new Record({
    _id: req.body.id,
    patient: req.body.patient,
    details: req.body.details,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  Record.updateOne({ _id: req.params.id, creator: req.userData.userId }, record).then(result => {
    if(result.matchedCount > 0) {
      res.status(200).json({message: "Update successful!"});
    } else {
      res.status(401).json({message: "Not authorized!"});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Couldn't update record! "
    });
  });
};

exports.getRecords = (req, res, next) => {
  // convert string to numbebr
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const recordQuery = Record.find().sort({'_id': -1});
  let fetchedRecords;

  if(pageSize && currentPage) {
    recordQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  recordQuery
    .then(documents => {
      fetchedRecords = documents;
      return Record.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Records fetched successfully!",
        records: fetchedRecords,
        maxRecords: count
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
      message: "Fetching record failed"
    });
  });
};

exports.getLabResult = (req, res, next) => {
  AdvancedTest.find({ _id: req.params.test_id })
    .then(lab_result => {
      if (lab_result) {
        res.status(200).json({_id: lab_result[0]._id, LabResult: lab_result[0].LabResult});
      } else {
        res.status(404).json({ message: "Lab result not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching lab result failed!"
      });
    });
}

exports.updateLabResult = (req, res, next) => {
  // get the data from request body
  const labData ={
    LabResult: req.body.lab_result
  };
  AdvancedTest.updateOne({ _id: req.params.test_id }, {$set: labData}).then(result => {
    if(result.matchedCount > 0) {
      res.status(200).json({message: "Update successful!"});
    } else {
      res.status(401).json({message: "Not authorized!"});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Couldn't update lab result! "
    });
  });
};

exports.getAllAdvModels = (req, res, next) => {
   AdvancedTest.find({ LabResult: { $ne: null } }).then(results => {
    if(results) {
      res.status(200).json(results);
    } else {
      res.status(404).json({message: 'Results found!'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching results failed!"
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
