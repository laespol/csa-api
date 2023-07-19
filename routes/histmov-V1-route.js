const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const histmovV1Controller = require('../controllers/histmov-V1-controller');

router.get('/',  login.required, histmovV1Controller.getHistmov);
router.get('/:idhistmov', login.required, histmovV1Controller.getHistmovDetail);
router.post('/', login.required, histmovV1Controller.postHistmov);
router.put('/:idhistmov', login.required, histmovV1Controller.updateHistmov);
router.delete('/:idhistmov', login.required, histmovV1Controller.deleteHistmov);


module.exports = router;