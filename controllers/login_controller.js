// app/routes.js

module.exports = (app, passport) => {

  app.post('/users/login', passport.authenticate('local-login', {
    failureFlash : true 
  }),
  function(req, res) {
    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
      req.session.cookie.expires = false;
    }
    
    res.sendStatus(200);
  });

    // process the signup form
  app.post('/users/signup', passport.authenticate('local-signup', {
    successRedirect : '/', 
    failureRedirect : '/', 
    failureFlash : true 
  }));

  app.get('/users/loggedIn', loggedIn, (req, res) => {
    res.send(200);
  })

  app.get('/users/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.sendStatus(403, 'Not Logged In');
    }
  }
}