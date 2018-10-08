const express = require('express');
const router = express.Router();
const _ = require('lodash');


const {User} = require('../models/user');


router.get('/',(req,res) => {
    User.find().then(data => res.send(data)).catch(err => res.send(err))
});

router.post('/',(req,res) => {
    let body =  _.pick(req.body,['userName','email','mobile','password']);
    let user = new User(body);
    user.save().then(data => {
        res.send(data);
    }).catch(err => res.send(err))
});


module.exports = {
    usersController:router
}