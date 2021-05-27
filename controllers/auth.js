const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(404).json({ ok: false, msg: 'User already exits' });
    } else {
      user = new User(req.body);

      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt);

      const token = await generateJWT(user.id, user.name);

      await user.save();
      return res
        .status(201)
        .json({ ok: true, uid: user.id, name: user.name, token });
    }
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'User credentials invalid' });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ ok: false, msg: 'User not found' });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ ok: false, msg: 'Password incorrect' });
    }

    const token = await generateJWT(user.id, user.name);

    res.status(200).json({ ok: true, uid: user.id, name: user.name, token });
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'User credentials invalid' });
  }
};

const renewToken = (req, res = response) => {
  res.json({ ok: true, msg: 'renew' });
};

module.exports = { createUser, loginUser, renewToken };
