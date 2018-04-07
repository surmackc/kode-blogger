const express = require('express');
const router = express.Router();

const db = require('../models');
const bcrypt = require('bcrypt-nodejs');
const randomstring = require('randomstring');

// router.get('/postNote', (req, res) => {
//     res.render('post', {message: req.flash('resetMessage'), showResetForm: true});
//   });

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
  if (!req.session.passport.user) {
    return res.status(400).send();
  }
  db.notes.findAll({
    where: { author: req.session.passport.user }
  }).then(data => {
    res.json(data);
  });
})

router.post('/notes/create/', (req, res) => {
  let textBody = req.body.content;
  console.log(textBody)
  // res.send(textBody)
  // let role = req.body.role;
  db.notes.create({
    // author: req.session.passport.user,
    // json: req.body.jsonBody,
    body: textBody
  })
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.send(err)
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