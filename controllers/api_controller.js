const express = require('express');
const router = express.Router();
const db = require('../models');

router.get("/:id?", (req, res) => {
    if (req.params.id) {
        var id = req.params.id;
        // add Sequelize query to get all results from database
         
        // db.findAll({
        //     where: {
        //         id
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
