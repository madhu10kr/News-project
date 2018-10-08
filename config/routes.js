const express = require('express');
const router = express.Router();

const {usersController} = require('../app/controllers/users_controller');
const {categoriesController} = require('../app/controllers/categories_controller');

router.use('/users',usersController);
router.use('/categories',categoriesController);


module.exports = {
    router
}