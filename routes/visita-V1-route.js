const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const visitaV1Controller = require('../controllers/visita-V1-controller');

router.get('/',  login.required, visitaV1Controller.getVisita);
router.get('/:idvisita', login.required, visitaV1Controller.getVisitaDetail);
router.post('/', login.required, visitaV1Controller.postVisita);
router.put('/:idvisita', login.required, visitaV1Controller.updateVisita);
router.delete('/:idvisita', login.required, visitaV1Controller.deleteVisita);
router.get('/gestor/:idusuario',  login.required, visitaV1Controller.getVisitaGestor);

module.exports = router;