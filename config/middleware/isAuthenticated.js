module.exports = function(req, res, next) {
    // checks to see if logged in
    if (req.user) {
      return next();
    }
  
    // If the user isn't logged in, redirect them to the login page
    return res.redirect("/");
  };