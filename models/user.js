// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema( {
    	username       : String,
        firstname    : String,
        lastname     : String,
    	password       : String,
        email        : String,
        isActive     : {
            type     : Boolean,
            default  : true
        },
        dateCreated  : {
            type     : Date,
            default  : Date.now
        },
    	roles          : {
    		type         : { },
    		default      : {
    			admin      : false,
    			user       : true,
          wing       : false,
          personnel  : false,
    		}
    	}
} );

// generating a hash
userSchema.methods.generateHash = function( password ) {
    return bcrypt.hashSync( password, bcrypt.genSaltSync( 8 ), null );
};

// checking if password is valid
userSchema.methods.validPassword = function( password ) {
    return bcrypt.compareSync( password, this.password );
};

userSchema.methods.toJSON = function( ) {
  var obj = this.toObject( );
  delete obj.password;
  return obj;
}

// create the model for users and expose it to our app
module.exports = mongoose.model( 'User', userSchema );
