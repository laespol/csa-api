const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const colunaV1Controller = require('../controllers/coluna-V1-controller');

router.get('/:programa', login.required, colunaV1Controller.getColunaDetail);
router.get('/usuario/:programa', login.required, colunaV1Controller.getColunaDetailusuario);
router.post('/:programa', login.required, colunaV1Controller.postColuna);


module.exports = router;