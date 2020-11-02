var path = require("path");
//middle ware to test if user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated.js");

module.exports = function(app) {
//Home page/Index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
//User log-in page
  app.get("/login", function(req, res) {
    if (req.user) {
     res.redirect("/jobs");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
//User signup page
  app.get("/signup",  function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
//Job board page
  app.get("/jobs", isAuthenticated, function(req, res){
      res.sendFile(path.join(__dirname, "../public/jobs.html"))
  });

};
