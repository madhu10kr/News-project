const express = require('express');
const router = express.Router();
const _ = require('lodash');


const {Category} = require('../models/category');


router.get('/',(req,res) => {
    Category.find().then(data => res.send(data)).catch(err => res.send(err))
});


router.post('/',(req,res) => {
    let body =  _.pick(req.body,['name']);
    let category = new Category(body);
    category.save().then(data => {
        res.send(data);
    }).catch(err => res.send(err))
});


module.exports = {
    categoriesController:router
}