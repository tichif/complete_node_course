const router = require('express').Router();

const authControllers = require('../controllers/auth');

router.get('/login', authControllers.getLoginPage);

module.exports = router;
