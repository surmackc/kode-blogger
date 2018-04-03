const express = require('express');
const router = express.Router();

const db = require('../models');
const bcrypt = require('bcrypt-nodejs');
const randomstring = require('randomstring');

router.get('/postNote', (req, res) => {
    res.render('post', {message: req.flash('resetMessage'), showResetForm: true});
  });

router.get('/notes/read/', (req, res) => {
  db.notes.findAll().then( data => {
    res.json("reading");
    // if (data) {
    //   data.updateAttributes({verified: true});
    //   req.flash('loginMessage', '<p class="success-message text-center">Email verified. Please login.</p>');
    //   res.redirect('/');
    // } else {
    //   req.flash('loginMessage', '<p class="error-message text-center">Invalid verification token. Please contact support.</p>');
    //   res.redirect('/');
    // }
  });
});

router.get('/notes/read/:id', (req, res) => {
    db.notes.findOne({where: {id: req.params.id}}).then( data => {
      res.json("reading");
      // if (data) {
      //   data.updateAttributes({verified: true});
      //   req.flash('loginMessage', '<p class="success-message text-center">Email verified. Please login.</p>');
      //   res.redirect('/');
      // } else {
      //   req.flash('loginMessage', '<p class="error-message text-center">Invalid verification token. Please contact support.</p>');
      //   res.redirect('/');
      // }
    });
  });

router.post('/note/create/', (req, res) => {
  db.notes.findOne({where: {id: req.params.id}}).then(data => {
    res.json("creating");
    // if (data) {
    //   if (data.dataValues.verified) {
    //     let token = randomstring.generate(16);
    //     data.updateAttributes({verificationToken: token});
    //     req.flash('resetMessage', '<p class="success-message text-center">Password reset email sent.</p>');
    //   } else {
    //     //User account is not verified, can't reset password
    //     req.flash('resetMessage', 
    //       `<p class="error-message text-center">Account is not verified. Please verify email before reseting password.
    //       <a href="/resendVerification/${data.dataValues.username}>Resend Verification</a></p>`);
    //   }
    // } else {
    //   req.flash('resetMessage', '<p class="error-message text-center">Username does not match our records</p>');
    // }

    // res.redirect('/resetRequest');
  });
});
//Route to edit note will 
router.put('/notes/update/:id', (req, res) => {
  // update one of the burgers
  db.notes.update({
    body: req.body
  },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(function(dbNote) {
    res.json("Editing");
  });

});

router.delete('/notes/delete/:id', (req, res) => {
    db.notes.findOne({where: {id: req.params.id}}).then(data => {
        res.json("deleting");
      // if (data) {
      //   if (data.dataValues.verified) {
      //     let token = randomstring.generate(16);
      //     data.updateAttributes({verificationToken: token});
      //     req.flash('resetMessage', '<p class="success-message text-center">Password reset email sent.</p>');
      //   } else {
      //     //User account is not verified, can't reset password
      //     req.flash('resetMessage', 
      //       `<p class="error-message text-center">Account is not verified. Please verify email before reseting password.
      //       <a href="/resendVerification/${data.dataValues.username}>Resend Verification</a></p>`);
      //   }
      // } else {
      //   req.flash('resetMessage', '<p class="error-message text-center">Username does not match our records</p>');
      // }
  
      // res.redirect('/resetRequest');
    });
  });

// router.get('/reset/:username/:token', (req, res) => {
//   db.users.findOne({where: {username: req.params.username, verificationToken: req.params.token}}).then(data =>{
//     if (data) {
//       res.render('resetForm');
//     } else {
//       req.flash('loginMessage', '<p class="error-message">Invalid password reset token. Please contact support.</p>');
//       res.redirect('/');
//     }
//   });
// });

// router.post('/reset/:username/:token', (req, res) => {
//   db.users.findOne({where: {username: req.params.username, verificationToken: req.params.token}}).then(data =>{
//     if (data) {
//       data.updateAttributes({
//         password: bcrypt.hashSync(req.body.password, null, null),
//         verificationToken: randomstring.generate(16)
//       });
//       req.flash('loginMessage', '<p class="success-message text-center">Password reset succesful. Please login with new password.</p>');
//       res.redirect('/');
//     } else {
//       req.flash('loginMessage', '<p class="error-message text-center">Invalid password reset token. Please contact support.</p>');
//       res.redirect('/');
//     }
//   });
// });

module.exports = router;