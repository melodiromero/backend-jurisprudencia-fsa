const express = require('express');

const controladorSumarios = require('../../controllers/sumario.controller');

const router = express.Router();

//router.get('/', controladorFallos.getAllFallos);

router.get('/', controladorSumarios.getSumarios);

module.exports = router;