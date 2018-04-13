const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const db = require('../models');
const Op = Sequelize.Op;

router.get('/posts', (req, res) => {
  if (!req.session.passport.user) {
    return res.status(400).send();
  }
  db.posts.findAll({
    where: { author: req.session.passport.user }
  }).then(data => {
    res.json(data);
  });
})
router.get('/posts/all', (req, res) => {
  db.posts.findAll({
    where: {published: 1},
    order: [ [ 'createdAt', 'DESC']]  }).then(data => {
    res.json(data);
  });
})

router.get('/posts/get/:amount', (req, res) => {
  db.posts.findAll({
    limit: parseInt(req.params.amount),
    where: {published: 1},
    order: [ [ 'createdAt', 'DESC']]
  }).then(entries => res.send(entries));
});

router.get('/posts/:id', (req, res) => {
  console.log(req.params);
  db.posts.findOne({
    where: {author: req.session.passport.user, id: req.params.id}
  }).then(data => {
    res.json(data);
  })
})

router.get('/posts/search/:title', (req, res) => {
  db.posts.findAll({
    where: {
      title: {
        [Op.regexp]: `${req.params.title}+`
      },
      published: 1
    } 
  }).then(data => {
    res.send(data);
  })
})

router.post('/posts', (req, res) => {
  let textBody = req.body.content;
  db.posts.create({
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
  db.posts.update({
    body: req.body.jsonBody,
    title: req.body.title
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
  db.posts.destroy({where: {id: req.params.id, author: req.session.passport.user}}).then(data => {
    res.status(200).send();
  });
});

router.get('/posts/publish/:id', (req, res) => {
  if (!req.session.passport.user) {
    return res.status(400).send();
  } else {
    db.posts.update({published: 1}, {
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
    db.posts.update({published: 0}, {
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