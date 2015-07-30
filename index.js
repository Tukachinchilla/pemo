var mongoose       = require( 'mongoose' );
var express        = require( 'express' );
var routes         = require( './routes' );
var cons           = require( 'consolidate' );
var bodyParser     = require( 'body-parser' );
var database       = require( './config/database' );
var morgan         = require( 'morgan' );
var cookieParser   = require( 'cookie-parser' );
var session        = require( 'express-session' );
var passport       = require( 'passport' );
var passportConfig = require( './config/passport' );
var port           = process.env.PORT || '3000';
var secret         = process.env.SECRET || 'fdsljkfdsklfjdsafjf2ioewfj';
var flash          = require( 'connect-flash' );
var MongoStore     = require( 'connect-mongo' )( session );
var swig           = require( 'swig' );

console.log( database.url );

mongoose.connect( database.url, function( err ) {
	if( err ) throw err;

	console.log( "Connected to", database.url );
	// require( './config/passport' )( passport ); // pass passport for configuration

	var app = express( );

	// Register our templating engine
    	app.engine( 'html', cons.swig );

    	//This is needed to resolve curly brace conflict between swig and angular swig vars will now use [[]]
    	swig.setDefaults( {
  		varControls : [ '[[', ']]' ]
	} );

	app.set( 'view engine', 'html' );
	app.set( 'views', './views' );

	//public files
	app.use( express.static( './public' ) );
	app.use( express.static( './views/elements' ) );

	app.use( morgan( 'dev' ) ); // log every request to the console
	app.use( cookieParser( ) ); // read cookies (needed for auth)
	app.use( bodyParser.json( ) );
	app.use( bodyParser.urlencoded( { extended : false } ) );

	// required for passport
	app.use( session( {
		secret            : secret,
		resave            : true,
		saveUninitialized : true,
		clear_interval    : 900,
    		cookie            : { maxAge: 2 * 60 * 60 * 1000 },
    		store             : new MongoStore( {
      		mongooseConnection : mongoose.connections[ 0 ]
    		} )
	} ) ); // session secret

	passportConfig( passport );

	app.use( passport.initialize( ) );
	app.use( passport.session( { } ) ); // persistent login sessions
	app.use( flash( ) ); // use connect-flash for flash messages stored in session

	routes( app, passport );

	app.listen( port, function( ) {
		console.log( "Now listening on ", port );
	} );
} );
