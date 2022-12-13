const express = require('express');

const controladorLogin = require('../controllers/login.controller');

const router = express.Router();

router.post('/', controladorLogin.getLogin);

router.post('/salir', controladorLogin.getLogout);

module.exports = router;
