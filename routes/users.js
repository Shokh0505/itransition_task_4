const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

router.post('/block', userController.blockUsersWithEmail);

module.exports = router;
