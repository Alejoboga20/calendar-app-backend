const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate('user', 'name');

  res.json({
    ok: true,
    events: events
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const savedEvent = await event.save();

    res.status(201).json({ ok: true, event: savedEvent });
  } catch (e) {
    console.log(e);
    res.status(500).json({ ok: false, msg: 'An error has ocured' });
  }

  res.json({
    ok: true,
    msg: 'createEvent'
  });
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ ok: false, msg: 'Event not found' });
    }

    if (event.user.toString() !== uid) {
      return res
        .status(401)
        .json({ ok: false, msg: 'Not authorized for this change' });
    }

    const newEvent = { ...req.body, user: uid };
    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true
    });

    res.json({
      ok: true,
      event: updatedEvent
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      ok: false,
      msg: 'An error has ocured'
    });
  }
};

const deleteEvent = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'deleteEvent'
  });
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
