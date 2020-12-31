const router = require('express').Router();

const authControllers = require('../controllers/auth');

router.get('/login', authControllers.getLoginPage);

router.post('/login', authControllers.postLogin);

router.post('/logout', authControllers.postLogout);

module.exports = router;
