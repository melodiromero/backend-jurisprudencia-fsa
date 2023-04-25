const express = require('express');

const controladorReporte = require('../controllers/reporte.controller');

const router = express.Router();

router.get('/', controladorReporte.getReporte);

module.exports = router;
