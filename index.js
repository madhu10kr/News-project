const express = require('express');
const morgan = require('morgan');
const _ = require('lodash');

const {mongoose} = require('./config/db');
const {router} = require('./config/routes');

const app = express();
const port = 3000;


app.use(express.json());
app.use(morgan('dev'));
app.use('/',router);
app.use(function(req, res, next) {
    res.status(404).send({ error : 'route not found'});
});


app.listen(port,() => {
    console.log('project - Listening to port '+port);
});