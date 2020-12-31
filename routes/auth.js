const router = require('express').Router();

const authControllers = require('../controllers/auth');

router.get('/login', authControllers.getLoginPage);

router.post('/login', authControllers.postLogin);

module.exports = router;
