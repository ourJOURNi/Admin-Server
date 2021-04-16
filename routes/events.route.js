const express = require("express");
const router  = express.Router();
var eventsController  = require('../controller/events-controller');

router.get('/',  eventsController.getEvents)
router.post('/add-event', eventsController.addEvent)
router.post('/update-event', eventsController.updateEvent)
router.delete('/delete-event/:_id', eventsController.deleteEvent)

module.exports = router;