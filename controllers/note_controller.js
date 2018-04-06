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
    
  });
});

router.get('/notes/read/:id', (req, res) => {
    db.notes.findOne({where: {id: req.params.id}}).then( data => {
      res.json("reading");
      
    });
  });

router.get('/notes', (req, res) => {
  db.notes.findAll({
    where: { author: req.session.passport.user }
  }).then(data => {
    res.json(data);
  });
})

router.post('/notes/create/', (req, res) => {
  let textBody = req.body.textBody;
  // let role = req.body.role;
  db.notes.create({
    author: req.session.passport.user,
    body: textBody
  }).then(data => {
    res.json(data);
    // res.redirect("/")
    // res.json(req)
    // res.json(data)
    
  });
});

router.put('/notes/update/:id', (req, res) => {
  
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
      
      
    });
  });



module.exports = router;