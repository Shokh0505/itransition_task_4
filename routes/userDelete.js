const express = require('express');
const router = express.Router();

const userDeleteRouter = require('../controllers/userDelete.controllers');

router.post('/delete_users', userDeleteRouter.deleteUsers);
router.post('/delete_unverified_users', userDeleteRouter.deleteUnverifiedUsers);

module.exports = router;
