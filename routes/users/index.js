var express  = require( 'express' );
var router   = express.Router( );
var User     = require( '../../models/user.js' );

/* GET users listing. */
router.get( '/', function( req, res, next ) {
  return res.render( 'user/home' );
} );

module.exports = router;
