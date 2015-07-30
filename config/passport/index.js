var LocalStrategy  = require( 'passport-local' ).Strategy;
var User           = require( '../../models/user.js' );

module.exports = function( passport ) {
	passport.use( new LocalStrategy( function( username, password, done ) {
		User.findOne( { username : username }, function( err, user ) {
			if( err ) {
				return done( err );
			}

			if( !user ) {
				console.log( "No User Exists." );
				return done( null, false, { message : "Incorrect username" } );
			}

			if( !user.validPassword( password ) ) {
				console.log( "Incorrect Password" );
				return done( null, false, { message : "Incorrect password" } );
			}

			if( !user.isActive ) {
				console.log( "Inactive User" );
				return done( null, false, { message : "This User is not Active.  Contact an Administrator." } );
			}

			return done( null, user );
		} );
	} ) );

	passport.serializeUser( function( user, done ) {
  		done( null, user.id );
	} );

	passport.deserializeUser( function( id, done ) {
  		User.findById( id, function( err, user ) {
    			done( err, user );
    		} );
	} );
}
