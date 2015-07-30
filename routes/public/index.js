var express = require( 'express' );
var router  = express.Router( );
var User    = require( '../../models/user.js' );

router.get( '/', function( req, res, next ) {
  return res.render( 'landing' );
	/*if( req.user ) {
		return res.render( 'landing' );
	} else {
		return res.render( 'landing', { notices : req.flash( 'notices' ) } );
	}*/
} );

module.exports = router;
