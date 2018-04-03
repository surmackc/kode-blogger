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

router.post('/note/create/', (req, res) => {
  db.notes.findOne({where: {id: req.params.id}}).then(data => {
    res.json("creating");
    
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