const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const imovelV1Controller = require('../controllers/imovel-V1-controller');

router.get('/',  login.required, imovelV1Controller.getImovel);
router.get('/:idimovel', login.required, imovelV1Controller.getImovelDetail);
router.post('/', login.required, imovelV1Controller.postImovel);
router.put('/:idimovel', login.required, imovelV1Controller.updateImovel);
router.delete('/:idimovel', login.required, imovelV1Controller.deleteImovel);


module.exports = router;