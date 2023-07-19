const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const solicitacaoV1Controller = require('../controllers/solicitacao-V1-controller');

router.get('/:skip&:take&:sortField&:sortOrder&:globalFilter&:filters&',  login.required, solicitacaoV1Controller.getSolicitacao);
//router.get('/',  login.required, solicitacaoV1Controller.getSolicitacao);
router.get('/:idsolicitacao', login.required, solicitacaoV1Controller.getSolicitacaoDetail);
router.post('/', solicitacaoV1Controller.postSolicitacao);
router.put('/:idsolicitacao', login.required, solicitacaoV1Controller.updateSolicitacao);
router.delete('/:idsolicitacao', login.required, solicitacaoV1Controller.deleteSolicitacao);
router.post('/segura/' ,login.required, solicitacaoV1Controller.postSolicitacaoSegura);

module.exports = router;