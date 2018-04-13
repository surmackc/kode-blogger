var express = require("express");
var request = require("request");
var cheerio = require("cheerio");

var router = express.Router();


var db = require("../models/");

// var article = require("../models/articles.js");


router.get("/scrape", function(req, res) {

  request("https://davidwalsh.name/", function(error, response, html) {
  
    var $ = cheerio.load(response.body);

    // console.log(response)

    $(".p").each(function(i, element) {
     
      // console.log(element);
      // console.log(test)
     
      var result = {};

      
      result.body = $(this)
        .children("a")
        .text();
     


          // res.json(result);

     
      db.articles.create(result)
        .then(function(dbArticle) {
       
          
        })
        .catch(function(err) {
          
          return res.json(err);
        });
    });

    //  res.redirect("/");
    // res.json("Screppp")

  })

});



module.exports = router;