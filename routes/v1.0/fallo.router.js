const express = require('express');

const controladorFallos = require('../../controllers/fallo.controller');

const router = express.Router();

router.get('/fulldocument', controladorFallos.getFalloById);

router.get('/', controladorFallos.getFallos);

module.exports = router;
