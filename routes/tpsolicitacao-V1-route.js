const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const tpsolicitacaoV1Controller = require('../controllers/tpsolicitacao-V1-controller');

router.get('/', tpsolicitacaoV1Controller.getTpsolicitacao);
router.get('/:idtpsolicitacao', tpsolicitacaoV1Controller.getTpsolicitacaoDetail);
router.post('/', login.required, tpsolicitacaoV1Controller.postTpsolicitacao);
router.put('/:idtpsolicitacao', login.required, tpsolicitacaoV1Controller.updateTpsolicitacao);
router.delete('/:idtpsolicitacao', login.required, tpsolicitacaoV1Controller.deleteTpsolicitacao);


module.exports = router;