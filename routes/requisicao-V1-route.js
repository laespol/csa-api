const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const requisicaoV1Controller = require('../controllers/requisicao-V1-controller');

//router.get('/',  login.required, requisicaoV1Controller.getRequisicao);
//router.get('/:idrequisicao', login.required, requisicaoV1Controller.getRequisicaoDetail);
router.post('/', login.required, requisicaoV1Controller.postRequisicao);
router.put('/:idrequisicao', login.required, requisicaoV1Controller.updateRequisicao);
router.delete('/:idrequisicao', login.required, requisicaoV1Controller.deleteRequisicao);
router.get('/:skip&:take&:sortField&:sortOrder&:globalFilter&:filters&',  login.required, requisicaoV1Controller.getRequisicao);
router.get('/relatorio/geral',  login.required, requisicaoV1Controller.getRequisicaogeral);
router.get('/grafico/geral/:ano', login.required, requisicaoV1Controller.getHoraGrafico);
router.get('/grafico/RequisicaoGrafico/:ano', login.required, requisicaoV1Controller.getRequisicaoGrafico);

module.exports = router;
