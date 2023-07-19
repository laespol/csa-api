const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const contratoV1Controller = require('../controllers/contrato-V1-controller');

//router.get('/',  login.required, contratoV1Controller.getContrato);
//router.get('/:idcontrato', login.required, contratoV1Controller.getContratoDetail);
router.post('/', login.required, contratoV1Controller.postContrato);
router.put('/:idcontrato', login.required, contratoV1Controller.updateContrato);
router.delete('/:idcontrato', login.required, contratoV1Controller.deleteContrato);
router.get('/:skip&:take&:sortField&:sortOrder&:globalFilter&:filters&',  login.required, contratoV1Controller.getContrato);
router.get('/relatorio/geral',  login.required, contratoV1Controller.getContratogeral);
router.post('/pesquisa/geral', login.required, contratoV1Controller.postContratoPesquisageral);

module.exports = router;
