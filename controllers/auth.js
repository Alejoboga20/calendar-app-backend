const { response } = require('express');
const User = require('../models/User');

const createUser = async (req, res = response) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(404).json({ ok: false, msg: 'User already exits' });
    } else {
      user = new User(req.body);
      await user.save();
      return res.status(201).json({ ok: true, uid: user.id, name: user.name });
    }
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'User credentials invalid' });
  }
};

const loginUser = (req, res = response) => {
  const { email, password } = req.body;
  res.status(200).json({ ok: true, msg: 'login', email, password });
};

const renewToken = (req, res = response) => {
  res.json({ ok: true, msg: 'renew' });
};

module.exports = { createUser, loginUser, renewToken };
