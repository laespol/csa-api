const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const chatgptV1Controller = require('../controllers/chatgpt-V1-controller');

router.post('/', login.required, chatgptV1Controller.postChatgpt);

module.exports = router;