const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const funcionarioV1Controller = require('../controllers/funcionario-V1-controller');

router.get('/',  login.required, funcionarioV1Controller.getFuncionario);
router.get('/:chapa', login.required, funcionarioV1Controller.getFuncionarioDetail);
router.get('/nome/:nome', login.required, funcionarioV1Controller.getFuncionarioDetailNome);
router.post('/', login.required, funcionarioV1Controller.postFuncionario);
router.put('/:idfuncionario', login.required, funcionarioV1Controller.updateFuncionario);
router.delete('/:idfuncionario', login.required, funcionarioV1Controller.deleteFuncionario);


module.exports = router;