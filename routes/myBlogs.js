module.exports = (app, db) => {

	app.get('/myBlogs', (req, res) => {					
		if (req.session.userid) {			
			db.Message.findAll({
				where: {userId: req.session.userid}
			})
			.then((data) => {
				res.render('myBlogs', {messages: data } )
			})
			.catch(e => {
				console.error('An error has occured:', e.stack)
			});
		} else {
		res.redirect("login")
		}	
	});
};
