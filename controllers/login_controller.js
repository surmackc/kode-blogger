// app/routes.js

module.exports = (app, passport) => {
  app.post('/users/login', passport.authenticate('local-login', {
    // successRedirect : '/', 
    // failureRedirect : '/', 
    failureFlash : true 
  }),
  function(req, res) {
    console.log(req.cookies);
    console.log('Logged in.');
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

  function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.send('Error: Not logged in');
    }
}
}



  // router.get('/signup', function(req, res) {
  //   res.render('home', { message: req.flash('signupMessage'),
  //     username: req.flash('username'),
  //     companyName: req.flash('companyName'),
  //     email: req.flash('email'),
  //     showSignupScreen: true });
  // });



  // router.get('/logout', function(req, res) {
  //   req.logout();
  //   res.redirect('/');
  // });

// module.exports = router;