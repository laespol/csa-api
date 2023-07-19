const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const alunoserieV1Controller = require('../controllers/alunoserie-V1-controller');

router.get('/', login.required, alunoserieV1Controller.getAlunoserie);
router.get('/:idalunoserie', login.required, alunoserieV1Controller.getAlunoserieDetail);
router.post('/', login.required, alunoserieV1Controller.postAlunoserie);
router.put('/:idalunoserie', login.required, alunoserieV1Controller.updateAlunoserie);
router.delete('/:idalunoserie', login.required, alunoserieV1Controller.deleteAlunoserie);
router.get('/aluno/:idaluno', login.required, alunoserieV1Controller.getAlunoserieDetailaluno);
router.get('/anoletivo/:idanoletivo', login.required, alunoserieV1Controller.getAlunoserieDetailanoletivo);

module.exports = router;

