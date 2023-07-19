const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const documentoV1Controller = require('../controllers/documento-V1-controller');

router.get('/',  login.required, documentoV1Controller.getDocumento);
router.get('/:idcontrato', login.required, documentoV1Controller.getDocumentoDetail);
router.post('/:idcontrato', login.required, documentoV1Controller.postDocumento);
router.put('/:idcontrato', login.required, documentoV1Controller.updateDocumento);
router.delete('/:idcontrato', login.required, documentoV1Controller.deleteDocumento);
router.get('/pdf/:idcontrato', login.required, documentoV1Controller.getDocumentoDetailPDF);

module.exports = router;
