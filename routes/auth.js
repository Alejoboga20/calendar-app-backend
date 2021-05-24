const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const router = Router();

router.post('/new', [check('name', 'Name is required').not().isEmpty()], createUser);

router.post('/', loginUser);

router.get('/renew', renewToken);

module.exports = router;
/* 
  User Routes/Auth 
  host + /api/auth
*/
