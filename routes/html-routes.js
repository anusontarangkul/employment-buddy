var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated.js");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/login", function(req, res) {
    if (req.user) {
     res.redirect("/jobs");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup",  function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/jobs", isAuthenticated, function(req, res){
      res.sendFile(path.join(__dirname, "../public/jobs.html"))
  });

};
