const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const menuV1Controller = require('../controllers/menu-V1-controller');

router.get('/',  login.required, menuV1Controller.getMenu);
router.get('/:idmenu', login.required, menuV1Controller.getMenuDetail);
router.post('/', login.required, menuV1Controller.postMenu);
router.put('/:idmenu', login.required, menuV1Controller.updateMenu);
router.delete('/:idmenu', login.required, menuV1Controller.deleteMenu);


module.exports = router;