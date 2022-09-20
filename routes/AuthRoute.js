// import express from 'express';

// // const verifyToken = require('../middleware/verifyToken');
// import verifyToken from '../middleware/verifyToken.js';
// const AuthRoute = express.Router();

// import AuthController from '../controllers/AuthController.js';

const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/', verifyToken, AuthController.getUser);

module.exports = router;
