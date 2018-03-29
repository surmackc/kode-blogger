const express = require('express');
const router = express.Router();
const db = require('../models');

router.get("/", (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
});

module.exports = router;
