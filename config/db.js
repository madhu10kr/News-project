const mongoose = require('mongoose');//it returns object
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/project',{ useNewUrlParser: true }).then(() => {
    console.log('connected to DB');
}).catch(err => console.log(err));
mongoose.set('useCreateIndex',true);

module.exports = {
    mongoose
};
