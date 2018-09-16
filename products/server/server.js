'use strict';

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/db');

mongoose.connect(db.url, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: true }));
require('./app/routes')(app, mongoose);


app.listen(3001, '0.0.0.0', () => {
	console.log('Server started on port 3001');
});