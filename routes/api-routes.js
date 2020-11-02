var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
// Getting user information from login form
app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
    });
//User creation
app.post("/api/signup", function(req, res) {
    db.User.create({
        email: req.body.email,
        password: req.body.password
    }).then(function() {
        res.redirect(307, "/api/login");
        })
        .catch(function(err) {
        res.status(401).json(err);
        });
    });
//Jobs Creation
app.post("/api/user/jobs", function(req, res){
    db.Job.create({
        title: req.body.title,
        company: req.body.company,
        status: req.body.status,
        UserId: req.user.id, 
     
    }).then(function(results){
        res.json(results)
    })
});   
//Getting User information
app.get("/api/user_data", function(req, res){
    db.Job.findAll({ 
      where:{
      UserId: req.user.id,  
    }     
    }).then(function(results){
        res.json(results);
    })
});
//Updating Job Status
app.put("/api/update_status", function(req, res){
    db.Job.update(
        { status: req.body.status },
        { where: { id: req.body.id } }
      ).then(function() {
        res.status(200).end();
    });
});
//logging out user
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });










}