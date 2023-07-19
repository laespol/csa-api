const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const custoV1Controller = require('../controllers/custo-V1-controller');

router.get('/',  login.required, custoV1Controller.getCusto);
router.get('/:idimovel', login.required, custoV1Controller.getCustoDetail);
router.post('/', login.required, custoV1Controller.postCusto);
router.put('/:idcusto', login.required, custoV1Controller.updateCusto);
router.delete('/:idcusto', login.required, custoV1Controller.deleteCusto);


module.exports = router;