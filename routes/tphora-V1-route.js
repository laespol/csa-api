const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const tphoraV1Controller = require('../controllers/tphora-V1-controller');

router.get('/',  login.required, tphoraV1Controller.getTphora);
router.get('/:idtphora', login.required, tphoraV1Controller.getTphoraDetail);
router.post('/', login.required, tphoraV1Controller.postTphora);
router.put('/:idtphora', login.required, tphoraV1Controller.updateTphora);
router.delete('/:idtphora', login.required, tphoraV1Controller.deleteTphora);


module.exports = router;