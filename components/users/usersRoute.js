const express = require('express');
const router = express.Router();
const userCtrl = require ('./usersController');

router.get('/', userCtrl.getUser);

router.post('/', userCtrl.updateUser);

router.post('/add', userCtrl.postUser);

router.post('/find', userCtrl.findUser);

module.exports = router;