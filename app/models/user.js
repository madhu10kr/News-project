const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;


const userSchema = new Schema ({
    userName: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function(value){
            return validator.isEmail(value)
        },
        message: 'invalid Email format'
    },
    password: {
        type: String,
        required:true,
        minlength: 8,
        maxlength: 128
    },
    mobile: {
        type: String,
        validate: function(value){
            return validator.isNumeric(value) && validator.isLength(value,{min:10,max:10});//is numeric takes numbers in strings
        },
        message: 'should be 10 digits'
    },
    bookmarks: [ String ],
    categories: [ Schema.Types.ObjectId ],
    tokens: [{
        
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        
    }]
});



const User = mongoose.model('User',userSchema);

module.exports = {
    User
}
