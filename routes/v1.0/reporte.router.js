const express = require('express');

const controladorReporte = require('../../controllers/reporte.controller');

const router = express.Router();

router.get('/', controladorReporte.getReporte);

router.get('/anio', controladorReporte.getReportePorAnio);

router.get('/tribunal', controladorReporte.getReportePorTribunal);

module.exports = router;
