module.exports = (app, db) => {

	app.get("/logOut",(req, res) => { 
		req.session.destroy()
		res.redirect("login")
	});	
};
