const express = require('express');
const router = express.Router();
const db = require('../models');

router.get("/:q?", (req, res) => {
    if (req.params.q) {
        var query = req.params.q;
        // add Sequelize query to get all results from database
         
        // db.findAll({
        //     where: {
        //         query
        //     }
        // })
        // .then(results => {
        //     res.set('Content-Type', 'application/json');
        //     res.send(results);
        // });

    } else {
        // add Sequelize query to get all results from database

        // add Sequelize query to get all results from database 
        // db.findAll()
        // .then(results => {
        //     res.set('Content-Type', 'application/json');
        //     res.send(results);
        // });
    }
});

module.exports = router;
