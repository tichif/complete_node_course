const router = require('express').Router();

const authControllers = require('../controllers/auth');

router.get('/login', authControllers.getLoginPage);

router.post('/login', authControllers.postLogin);

router.get('/signup', authControllers.getSignUpPage);

router.post('/signup', authControllers.postSignUp);

router.post('/logout', authControllers.postLogout);

module.exports = router;
