// import express from 'express';
// import { storage } from '../config/cloudinary.config.js';
// import multer from 'multer';
// const multer = require('multer');
// const upload = multer({ storage });
// const verifyToken = require('../middleware/verifyToken');
// import verifyToken from '../middleware/verifyToken.js';

const express = require('express');
const { storage } = require('../config/cloudinary.config');
const multer = require('multer');
const upload = multer({ storage });
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.delete('/history/destroy', verifyToken, UserController.historyDestroy);
router.get('/history/list', verifyToken, UserController.historyList);
router.post('/history', verifyToken, UserController.history);
router.delete('/favorite/destroy', verifyToken, UserController.favoriteDestroy);
router.get('/favorite/list', verifyToken, UserController.favoriteList);
router.post('/favorite', verifyToken, UserController.favorite);
router.patch('/avatar', verifyToken, upload.single('image'), UserController.avatar);
router.patch('/name', verifyToken, UserController.name);
router.patch('/password', verifyToken, UserController.password);


module.exports = router;
