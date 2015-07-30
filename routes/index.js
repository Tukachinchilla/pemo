var root  = require( './public' );
//var users = require( './users' );
//var admin = require( './admin' );
//var User  = require( '../models/user.js' );

function isLoggedIn( req, res, next ) {
	if( !req.isAuthenticated( ) ) {
		return res.redirect( '/' );
	}
	return next( );
}

function hasAdmin( req, res, next ) {
	if( isLoggedIn ) {
		if( !req.user.roles.admin ) {
			return res.redirect( '/' );
		}
	}
	return next( );
}

module.exports = function( app, passport ) {
	//Set Locals for view access
	/*app.use( function( req, res, next ) {
		res.locals.loggedInUser = req.isAuthenticated ? req.user : false;
		return next( );
	} );

	app.post( '/login', passport.authenticate( 'local', {
		successRedirect : '/',
		failureRedirect : '/',
		failureFlash    : { notices : "Invalid username or password" }
	} ) );

	app.get( '/logout', function( req, res ) {
  		req.logout( );
  		return res.redirect( '/' );
	} );*/

	app.use( '/', root );
	//app.use( '/user', isLoggedIn, users );
	//app.use( '/admin', isLoggedIn, hasAdmin, admin );

	//Handle the 404
	app.use( function( req, res, next ) {
		res.render( 'error' );
	} );
}
