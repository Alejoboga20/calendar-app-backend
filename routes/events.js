const { Router } = require('express');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/events');
const router = Router();

router.get('/', getEvents);

router.post('/', createEvent);

router.put('/', updateEvent);

router.delete('/', deleteEvent);

module.exports = router;
