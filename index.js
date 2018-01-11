
const pg = require('pg');
const Client = pg.Client;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./sequelize.js');
const bcrypt = require('bcrypt');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const expressSession = require('express-session');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(expressValidator({
	errorFormatter: (param, msg, value) => {
		var namespace = param.split('.')
		, root = namespace.shift()
		, formParam = root;
		while (namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param : formParam,
			msg   : msg,
			value : value
		};
	}
}));
app.use(expressSession( {
	secret: '23AX-10PL-34MH',
	saveUninitialized: true,
	resave: true 
}));
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.set('view engine', 'pug');

//Initialize sequelize
require('./sequelize.js')();

//Login page
require('./routes/login')(app, db, bcrypt);

//Sign up Page
require('./routes/signUp')(app, db, bcrypt);

//Log out
require('./routes/logOut')(app, db);

//Home page
require('./routes/home')(app, db);

//New Post page
require('./routes/newBlog')(app, db);

//All blogs page
require('./routes/allBlogs')(app, db);

//My blogs page
require('./routes/myBlogs')(app, db);

/*--------------local server on port 3000--------------------*/

let port = 3000;
app.listen(port, () => {
	console.log('Listening to port:', port);
});