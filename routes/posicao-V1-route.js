const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const posicaoV1Controller = require('../controllers/posicao-V1-controller');

router.get('/',  login.required, posicaoV1Controller.getPosicao);
router.get('/:idposicao', login.required, posicaoV1Controller.getPosicaoDetail);
router.post('/', login.required, posicaoV1Controller.postPosicao);
router.put('/:idposicao', login.required, posicaoV1Controller.updatePosicao);
router.delete('/:idposicao', login.required, posicaoV1Controller.deletePosicao);


module.exports = router;