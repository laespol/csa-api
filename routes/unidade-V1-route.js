const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const unidadeV1Controller = require('../controllers/unidade-V1-controller');

router.get('/',  login.required, unidadeV1Controller.getUnidade);
router.get('/:idunidade', login.required, unidadeV1Controller.getUnidadeDetail);
router.post('/', login.required, unidadeV1Controller.postUnidade);
router.put('/:idunidade', login.required, unidadeV1Controller.updateUnidade);
router.delete('/:idunidade', login.required, unidadeV1Controller.deleteUnidade);


module.exports = router;