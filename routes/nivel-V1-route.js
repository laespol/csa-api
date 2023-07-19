const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const nivelV1Controller = require('../controllers/nivel-V1-controller');

router.get('/',  login.required, nivelV1Controller.getNivel);
router.get('/:idnivel', login.required, nivelV1Controller.getNivelDetail);
router.post('/', login.required, nivelV1Controller.postNivel);
router.put('/:idnivel', login.required, nivelV1Controller.updateNivel);
router.delete('/:idnivel', login.required, nivelV1Controller.deleteNivel);


module.exports = router;