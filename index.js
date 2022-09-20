// import dotenv from "dotenv";
// import express from "express";
// import connect from './config/db/index.js';
// import morgan from 'morgan';
// import route from './routes/index.js';
// import cors from 'cors';

require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const route = require('./routes');
const cors = require('cors');
const db = require('./config/db');

// dotenv.config();
//Connect to DB
db.connect();

const app = express();
const port = process.env.PORT || 3002;

//Static
app.use(express.static('public'));

//Get respone body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

//HTTP logger
app.use(morgan('combined'));

route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
