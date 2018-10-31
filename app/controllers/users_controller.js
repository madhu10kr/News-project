const express = require('express');
const router = express.Router();
const _ = require('lodash');

const {User} = require('../models/user');
const {authenticateUser} = require('../middlewares/authentication');


router.get('/mainpage',(req,res) => {
    res.sendFile('../../index.html');
});

router.get('/categories',authenticateUser,(req,res) => {
    let user = req.locals.user;
    res.send(user.categories);
});

router.post('/categories',authenticateUser,(req,res) => {
    let user = req.locals.user;
    let categoryArray = req.locals.categories;
    //console.log(typeof(categoryArray))
    user.categories.push(...categoryArray);
    user.save().then(data => {
        res.send(data);
    }).catch(err => console.log(err));
});

router.post('/bookmarks',authenticateUser,(req,res) => {
    let user = req.locals.user;
    let bookmark = req.locals.bookmark;
    //console.log((bookmark))
    user.bookmarks.push(bookmark);
    user.save().then(data => {
        console.log(data);
    }).catch(err => console.log(err));
});

router.post('/register', (req, res) => {
    let body = _.pick(req.body, ['userName', 'email', 'password', 'mobile']);
    let user = new User(body);
    user.save().then((user) => {
        return user.generateToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
        // res.send({
        //     user,
        //     'x-auth': token
        // });
    }).catch((err) => {
        res.send(err); 
    });
});

//login route
router.post('/login',(req,res) => {
    let body = _.pick(req.body,['email','password']);
    User.findByEmailAndPassword(body.email,body.password)
    .then((user) => {
        return user.generateToken();
    }) .then((token) => {
        res.header('x-auth',token).send()
    })
    .catch((err) => {
        res.send(err);
    });
});


//logout
router.delete('/logout',authenticateUser,(req,res) => {
    req.locals.user.deleteToken(req.locals.token).then(() => {
        res.send();
    }) .catch((err) => {
        res.send(err);
    });
    // User.findByIdAndUpdate({_id : req.locals.user},{$pull : {tokens : req.locals.token} }, {new : true})
    // .then((user) => {
    //     res.send(user);
    // }) .catch((err) => {
    //     res.send(err);
    // });
});


module.exports = {
    usersController:router
}