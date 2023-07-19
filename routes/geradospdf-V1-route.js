const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const geradospdfV1Controller = require('../controllers/geradospdf-V1-controller');

router.get('/',  login.required, geradospdfV1Controller.getGeradospdf);
router.get('/:programa', login.required, geradospdfV1Controller.getGeradospdfDetail);
router.post('/', login.required, geradospdfV1Controller.postGeradospdf);
router.put('/:idgeradospdf', login.required, geradospdfV1Controller.updateGeradospdf);
router.delete('/:idgeradospdf', login.required, geradospdfV1Controller.deleteGeradospdf);


module.exports = router;