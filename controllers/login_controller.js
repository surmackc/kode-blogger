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
    // res.redirect('/');
    console.log(req.session);
    res.cookie(req.session.cookie);
    res.send();
  });
    // process the signup form
  app.post('/users/signup', passport.authenticate('local-signup', {
    successRedirect : '/', 
    failureRedirect : '/', 
    failureFlash : true 
  }));
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