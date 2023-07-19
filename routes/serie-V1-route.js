const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const serieV1Controller = require('../controllers/serie-V1-controller');

router.get('/', login.required, serieV1Controller.getSerie);
router.get('/:idserie', login.required, serieV1Controller.getSerieDetail);
router.post('/', login.required, serieV1Controller.postSerie);
router.put('/:idserie', login.required, serieV1Controller.updateSerie);
router.delete('/:idserie', login.required, serieV1Controller.deleteSerie);

module.exports = router;