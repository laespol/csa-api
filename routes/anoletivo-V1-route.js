const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const anoletivoV1Controller = require('../controllers/anoletivo-V1-controller');

router.get('/', login.required, anoletivoV1Controller.getAnoletivo);
router.get('/:idanoletivo', login.required, anoletivoV1Controller.getAnoletivoDetail);
router.post('/', login.required, anoletivoV1Controller.postAnoletivo);
router.put('/:idanoletivo', login.required, anoletivoV1Controller.updateAnoletivo);
router.delete('/:idanoletivo', login.required, anoletivoV1Controller.deleteAnoletivo);

module.exports = router;