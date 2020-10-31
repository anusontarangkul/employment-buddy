var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
    });

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

app.post("/api/user/jobs", function(req, res){
    //console.log(req.user.id);
    db.Job.create({
        title: req.body.title,
        company: req.body.company,
        status: req.body.status,
        UserId: req.user.id, 
     
    }).then(function(results){
        res.json(results)
    })
});   

app.get("/api/user/:id/jobs", function(req, res){
    db.Job.findAll({ 
      where:{
      userId: req.params.id,  
    }     
    }).then(function(results){
        res.json(results);
    })
});











}