const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const sendmailV1Controller = require('../controllers/sendmail-V1-controller');

router.get('/',  login.required, sendmailV1Controller.getSendmail);
router.get('/:idsendmail', login.required, sendmailV1Controller.getSendmailDetail);
router.post('/', sendmailV1Controller.postSendmail);
router.put('/:idsendmail', login.required, sendmailV1Controller.updateSendmail);
router.delete('/:idsendmail', login.required, sendmailV1Controller.deleteSendmail);


module.exports = router;