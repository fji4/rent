var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
    local : {   email		: String,
                password	: String,
                name        : String,
                description : String,
                ownedApt   : {type:[String],default: []},
                wishList    : {type:[String],default: []},
                userPic     : String

    },
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    google        : {
        id           : String,
        // token        : String,
        name         : String,
        email        : String
    }
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
