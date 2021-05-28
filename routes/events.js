const { Router } = require('express');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/events');
const { validateJwt } = require('../middlewares/validateJwt');
const router = Router();

router.use(validateJwt);

router.get('/', getEvents);

router.post('/', createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;
