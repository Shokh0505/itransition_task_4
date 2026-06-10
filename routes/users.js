const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

router.get('/users', userController.getUsers);
router.post('/block', userController.blockUsersWithEmail);
router.post('/unblock', userController.unblockUsersWithEmail);

module.exports = router;
