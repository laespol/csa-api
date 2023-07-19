const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const loginV1Controller = require('../controllers/login-V1-controller');

router.post('/', loginV1Controller.Login);
router.post('/trocasenha', login.required, loginV1Controller.Trocasenha);
router.get('/configuracao/:idconfiguracao', login.required, loginV1Controller.getConfiguracao);

module.exports = router;