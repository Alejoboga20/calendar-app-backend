const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/fieldsValidator');
const { validateJwt } = require('../middlewares/validateJwt');
const router = Router();

router.post(
  '/new',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password should be 6 chars long').isLength({ min: 6 }),
    validateFields
  ],
  createUser
);

router.post(
  '/',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password should be 6 chars long').isLength({ min: 6 }),
    validateFields
  ],
  loginUser
);

router.get('/renew', validateJwt, renewToken);

module.exports = router;
/* 
  User Routes/Auth 
  host + /api/auth
*/
