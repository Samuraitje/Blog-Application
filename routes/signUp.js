module.exports = (app, db, bcrypt) => {

	app.get('/signUp', (req, res) => {
		res.render('signUp', {
			title: 'Sign Up', 
			success: req.session.success, 
			error: req.session.errors
		});		
		req.session.errors = null;
	});

	app.post('/signUp', (req, res) => {
		let firstname = req.body.firstname
		let lastname = req.body.lastname
		let email = req.body.email
		let username = req.body.username
		let password = req.body.password

		req.check('firstname', 'First name field is empty').notEmpty();
		req.check('lastname', 'Last name field is empty').notEmpty();
		req.check('email', 'Email is invalid').isEmail();
		req.check('username', 'Username is invalid (min 4 chars)').isLength( { min: 4 } );
		req.check('password', 'Password is invalid (min 4 chars)').isLength( { min: 4 } );

		let errors = req.validationErrors();
		
		if (errors) {
			res.render('signUp', {
				title: 'Sign Up',
				errors : errors
		 	});
		}else {
			db.User.findOne({
				where: {username: username}
			}).then(result => {
				if (result == null)	{
					bcrypt.hash(password, 10).then(hash => {
						db.User.create({
							firstname: firstname,
							lastname: lastname,
							email: email,
							username: username,
							password: hash
						})
						req.flash('success', 'User successfully registered')
						res.render('signUp', {
							title: 'Sign Up'
						});
					})
				} else {
					req.flash('failure', 'Username already taken')
					res.render('signUp', {
						title: 'Sign Up'
					});
				};
			});			
		};
	});
};