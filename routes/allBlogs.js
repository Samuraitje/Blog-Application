module.exports = (app, db) => {

	app.get('/allBlogs', (req, res) => {					
		if (req.session.userid) {
			db.Message.findAll()
			.then((data) => {
				res.render('allBlogs', { blogMessages: data } )
			})
			.catch(e => {
				console.error('An error has occured:', e.stack)
			});
		} else {
		res.redirect("login")
		};	
	});
};