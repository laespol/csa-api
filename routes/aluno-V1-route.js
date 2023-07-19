const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const alunoV1Controller = require('../controllers/aluno-V1-controller');

router.get('/', login.required, alunoV1Controller.getAluno);
router.get('/:idaluno', login.required, alunoV1Controller.getAlunoDetail);
router.post('/', login.required, alunoV1Controller.postAluno);
router.put('/:idaluno', login.required, alunoV1Controller.updateAluno);
router.delete('/:idaluno', login.required, alunoV1Controller.deleteAluno);
router.get('/page/situacaoaluno/:skip&:take&:sortField&:sortOrder&:globalFilter',  login.required, alunoV1Controller.getSituacaoaluno);

module.exports = router;