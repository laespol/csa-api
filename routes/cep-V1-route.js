const express = require('express');
const router = express.Router();
const login = require('../middleware/login');


const cepV1Controller = require('../controllers/cep-V1-controller');

router.get('/:idcep', cepV1Controller.getCepDetail);

module.exports = router;