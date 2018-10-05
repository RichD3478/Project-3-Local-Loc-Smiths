var db = require("../models");

module.exports = function (app) {
  app.get("/", function (req, res) {
    db.LocsSmith.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.LocsSmith.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/directions/:id", function(req, res) {
    db.LocsSmith.findOne({ where: { id: req.params.id } }).then(function(
      locsSmithdb

    ) {
      res.render("directions", {
        name: locsSmithdb.name,
        id: locsSmithdb.id
      });
    });
  });

  app.get("/review/:id", function (req, res) {
    db.LocsSmith.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("review", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};