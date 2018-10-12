const { User } = require('../models/user');

let authenticateUser = ((req,res,next) => {
    let token = req.header('x-auth');
    let categories = req.body.value;
    let bookmark = req.body.value1;
    User.findByToken(token)
    .then((user) => {
        req.locals = {
            user,
            token,
            categories,
            bookmark
        }
        next();
    })
    .catch((err) => {
        res.status(401).send(err);
    })
})

const authorizeUser = function(req, res, next) {
    if(req.locals.user.role == 'admin') {
        next(); 
    } else {
        res.status(403).send();
    }
}

module.exports = { authenticateUser, authorizeUser }