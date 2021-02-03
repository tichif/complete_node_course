const router = require('express').Router();
const { check, body } = require('express-validator');

const authControllers = require('../controllers/auth');
const User = require('../models/user');

router.get('/login', authControllers.getLoginPage);

router.post('/login', authControllers.postLogin);

router.get('/signup', authControllers.getSignUpPage);

router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid message')
      .normalizeEmail()
      .trim()
      .custom((value, {}) => {
        return User.findOne({ email: value }).then((existingUser) => {
          if (existingUser) {
            return Promise.reject(
              'Email already exists. Please add an another!!!'
            );
          }
        });
      }),
    body(
      'password',
      'Password should have 5 characters length and be alphanumeric'
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords should match');
      }
      return true;
    }),
  ],
  authControllers.postSignUp
);

router.post('/logout', authControllers.postLogout);

module.exports = router;
