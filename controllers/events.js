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
  res.json({
    ok: true,
    msg: 'updateEvent'
  });
};

const deleteEvent = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'deleteEvent'
  });
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
