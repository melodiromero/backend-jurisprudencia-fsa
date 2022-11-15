const express = require('express');

const controladorFallos = require('../controllers/fallo.controller');

const router = express.Router();

router.get('/', controladorFallos.getAllFallos);

router.get('/leerFallos', controladorFallos.getFallos);

module.exports = router;
