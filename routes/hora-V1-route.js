const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const horaV1Controller = require('../controllers/hora-V1-controller');

router.get('/:skip&:take&:sortField&:sortOrder&:globalFilter&:filters&',  login.required, horaV1Controller.getHora);
//router.get('/:idimovel', login.required, horaV1Controller.getHoraDetail);
router.post('/', login.required, horaV1Controller.postHora);
router.put('/:idhora', login.required, horaV1Controller.updateHora);
router.delete('/:idhora', login.required, horaV1Controller.deleteHora);
router.get('/grafico/geral/:ano', login.required, horaV1Controller.getHoraGrafico);

module.exports = router;