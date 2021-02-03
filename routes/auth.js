const router = require('express').Router();
const { check } = require('express-validator');

const authControllers = require('../controllers/auth');

router.get('/login', authControllers.getLoginPage);

router.post('/login', authControllers.postLogin);

router.get('/signup', authControllers.getSignUpPage);

router.post(
  '/signup',
  check('email')
    .isEmail()
    .withMessage('Please enter a valid message')
    .custom((value, {}) => {
      if (value === 'test@test.com') {
        throw new Error('This email is forbidden');
      }
      return true;
    }),
  authControllers.postSignUp
);

router.post('/logout', authControllers.postLogout);

module.exports = router;
