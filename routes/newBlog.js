module.exports = (app, db) => {
	app.get("/newBlog", (req, res) => {
		if (req.session.userid) {
			res.render("newBlog", {
				title: 'New Blog',
				user: req.session.user})
		} else {
			res.redirect("login", {
				title: 'Login'
			});
		};
	});

	app.post("/newBlog", (req, res) => {
		let MsgsComm = db.Message.hasMany(db.Comment)
		let userComm = db.User.hasMany(db.Comment)
		let userMsgs = db.User.hasMany(db.Message)

		db.Message.create({
		     title: req.body.title,
		     body: req.body.body,
		     userId: req.session.userid
		},{ 
			include: [{
				association: userMsgs
			}]
		})
		req.flash('success', 'New Blog Posted!')
		res.render("newBlog")
	});
};