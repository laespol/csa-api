const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const histalunoV1Controller = require('../controllers/histaluno-V1-controller');

router.get('/',  login.required, histalunoV1Controller.getHistaluno);
router.get('/:idhistaluno', login.required, histalunoV1Controller.getHistalunoDetail);
router.get('/consulta/:iditcompra', login.required, histalunoV1Controller.getHistalunoDetailIditcompra);
router.post('/', login.required, histalunoV1Controller.postHistaluno);
router.put('/:idhistaluno', login.required, histalunoV1Controller.updateHistaluno);
router.delete('/:idhistaluno', login.required, histalunoV1Controller.deleteHistaluno);



module.exports = router;