const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const documentosolV1Controller = require('../controllers/documentosol-V1-controller');

router.get('/',  login.required, documentosolV1Controller.getDocumentosol);
router.get('/:idsolicitacao', login.required, documentosolV1Controller.getDocumentosolDetail);
router.post('/:idsolicitacao', documentosolV1Controller.postDocumentosol);
router.put('/:idsolicitacao', login.required, documentosolV1Controller.updateDocumentosol);
router.delete('/:idsolicitacao', login.required, documentosolV1Controller.deleteDocumentosol);
router.get('/pdf/:idsolicitacao', login.required, documentosolV1Controller.getDocumentosolDetailPDF);
router.post('/segura/:idsolicitacao', login.required, documentosolV1Controller.postDocumentosolSegura);
module.exports = router;
