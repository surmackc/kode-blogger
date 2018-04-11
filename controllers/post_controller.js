const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/posts', (req, res) => {
  if (!req.session.passport.user) {
    return res.status(400).send();
  }
  db.notes.findAll({
    where: { author: req.session.passport.user }
  }).then(data => {
    res.json(data);
  });
})

router.get('/posts/get/:amount', (req, res) => {
  db.notes.findAll({
    limit: parseInt(req.params.amount),
    where: {published: 1},
    order: [ [ 'createdAt', 'DESC']]
  }).then(entries => res.send(entries));
});

router.get('/posts/:id', (req, res) => {
  console.log(req.params);
  db.notes.findOne({
    where: {author: req.session.passport.user, id: req.params.id}
  }).then(data => {
    res.json(data);
  })
})

router.post('/posts', (req, res) => {
  let textBody = req.body.content;
  db.notes.create({
    title: req.body.title,
    author: req.session.passport.user,
    body: req.body.jsonBody 
  })
  .then((data) => {
    res.json(data);
  })
  .catch(err => {
    res.send(err)
  });
});

router.put('/posts/update/:id', (req, res) => {
  db.notes.update({
    body: req.body.jsonBody
  },
    {
      where: {
        id: req.params.id
      }
    }
  ).then((dbNote) => {
    res.send(dbNote);
  });
});

router.delete('/posts/:id', (req, res) => {
  if (!req.session.passport.user) {
    return res.status(400).send();
  }
  db.notes.destroy({where: {id: req.params.id, author: req.session.passport.user}}).then(data => {
    res.status(200).send();
  });
});

router.get('/posts/publish/:id', (req, res) => {
  if (!req.session.passport.user) {
    return res.status(400).send();
  } else {
    db.notes.update({published: 1}, {
      where: { 
        author: req.session.passport.user,
        id: req.params.id
      }
    }).then(data => {
      res.status(200).send();
    }).catch(err => {
      console.log(err);
      res.status(500).send();
    })
  }
})

router.get('/posts/unpublish/:id', (req, res) => {
  if (!req.session.passport.user) {
    return res.status(400).send();
  } else {
    db.notes.update({published: 0}, {
      where: { 
        author: req.session.passport.user,
        id: req.params.id
      }
    }).then(data => {
      return res.status(200).send();
    }).catch(err => {
      return res.status(500).send();
    })
  }
})

module.exports = router;