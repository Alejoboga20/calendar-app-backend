const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'getEvents'
  });
};

const createEvent = async (req, res = response) => {
  console.log(req.body);

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
