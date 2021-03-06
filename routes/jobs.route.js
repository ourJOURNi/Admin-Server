const express = require("express");
const router  = express.Router();
var jobsController  = require('../controller/jobs-controller');

router.get('/',  jobsController.getJobs)
router.post('/add-job', jobsController.addJob)
router.put('/update-job', jobsController.updateJob)
router.delete('/delete-job/:_id', jobsController.deleteJob)

module.exports = router;