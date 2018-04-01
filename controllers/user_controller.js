const express = require('express');
const db = require('../models');
const bcrypt = require('bcrypt-nodejs');
const mailer = require('./mail_controller');
const randomstring = require('randomstring');

module.exports = (app, passport) => {
  app.get('/account/:username/:token', (req, res) => {
    db.users.findOne({where: {username: req.params.username, verificationToken: req.params.token}}).then( data => {
      if (data) {
        data.updateAttributes({verified: true});
        res.status(200);
      } else {
        res.status(400);
      }
    });
  });
  
  app.post('/account/resetRequest', (req, res) => {
    db.users.findOne({where: {username: req.body.username}}).then(data => {
      if (data) {
        if (data.dataValues.verified) {
          let token = randomstring.generate(16);
          mailer.sendResetPasswordEmail(data.dataValues.email, data.dataValues.username, token);
          data.updateAttributes({verificationToken: token});
          res.send({message: 'Password reset email sent.'});
        } else {
          //User account is not verified, can't reset password
          res.send({message: "Account is not verified. You must verify email before resetting the password"})
        }
      } else {
        res.send({message: "Username does not match our records."});
      }
    });
  });
  
  app.get('/resendVerification/:username', (req, res) => {
    db.users.findOne({where: {username: req.params.username}}).then(user => {
      let verificationToken = randomstring.generate(16);
      mailer.sendVerificationEmail(user.dataValues.email, 
        user.dataValues.username, verificationToken);
      user.updateAttributes({verificationToken: verificationToken});
      req.flash('loginMessage', '<p class="success-message text center">Verification email sent to email on file for account.</p>');
      res.redirect('/');
    });
  });
  
  app.post('/reset/:username/:token', (req, res) => {
    db.users.findOne({where: {username: req.params.username, verificationToken: req.params.token}}).then(data =>{
      if (data) {
        data.updateAttributes({
          password: bcrypt.hashSync(req.body.password, null, null),
          verificationToken: randomstring.generate(16)
        });
        res.send({message: 'Password reset succesful. Please login with new password'});
      } else {
        res.send({message: 'Invalid password reset token.'});
      }
    });
  });
}