module.exports = (app, db, bcrypt) => {

	app.get('/login', (req, res) => {
		if (req.session.userid) {
			res.render('home', { 
				title: 'Home',
				user: req.session.user } )
		} else {
			res.render('login', {
				title: 'Login'
			})
		}
	});

	app.post('/login', (req, res) => {
		let username = req.body.username
		let password = req.body.password

		db.User.findOne( { where: {username: username} } ).then(data => {
			if ( data == null ) {
				req.flash('failure', 'Username does not exist')
				res.render('login', {
					title: 'Login'
				})
			} else {
				hash = data.dataValues.password
				bcrypt.compare(password, hash).then(equals => {
					if (equals) {
						req.session.user = username
						req.session.userid = data.dataValues.id
						res.render('home', {
							title: 'Home',
							user: req.session.user} )
					} else{
						req.flash('failure', 'Wrong username or password')
						res.render('login', {
							title: 'Login'
						});	
					};
				});
			};
		});
	});
};
