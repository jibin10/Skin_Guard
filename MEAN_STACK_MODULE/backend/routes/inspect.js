const express = require("express");

const InspectController = require("../controllers/inspect");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post('', checkAuth, extractFile, InspectController.createRecord);
router.post('/quick_test', checkAuth, extractFile, InspectController.createQTRecord);
router.post('/adv_test', checkAuth, extractFile, InspectController.createAdvRecord);
router.put('/:record_id', checkAuth, extractFile, InspectController.updateRecord);
router.get('', InspectController.getRecords);
router.get("/record/:id", InspectController.getRecord);
router.delete('/:id', checkAuth, InspectController.deleteRecord);

router.get("/lab_result/:test_id", checkAuth, InspectController.getLabResult);
router.put("/lab_result/:test_id", checkAuth, InspectController.updateLabResult);

router.get("/all_model_results", InspectController.getAllAdvModels);

module.exports = router;
