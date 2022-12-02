const express = require('express');

const controladorTribunal = require('../controllers/tribunal.controller');

const router = express.Router();

router.get('/', controladorTribunal.getTribunales);

module.exports = router;
