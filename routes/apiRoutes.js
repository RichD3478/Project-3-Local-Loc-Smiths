var db = require("../models");

module.exports = function (app) {
    // Get all examples (test DB)
    app.get("/api/examples", function (req, res) {
        db.LocsSmith.findAll({}).then(function (locsSmithdb) {
            res.json(locsSmithdb);
        });
    });

    // Create a new example
    app.post("/api/examples", function (req, res) {
        db.LocsSmith.create(req.body).then(function (dbExample) {
            res.json(dbExample);
        });
    });

    // Delete an example by id
    app.delete("/api/examples/:id", function (req, res) {
        db.LocsSmith.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
            res.json(dbExample);
        });
    });

    // LocsSmith DB 
    app.get("/api/locsSmith", function (req, res) {
        db.LocsSmith.findAll({
            attributes: [
                [sequelize.fn("AVG", sequelize.col("clientRating")), "ratingAvg"]
            ]
        }).then(function (locsSmithdb) {
            res.json(locsSmithdb);
            console.log(cleanAvg);
        });
    });

    app.post("/api/locsSmith", function (req, res) {
        db.LocsSmith.create(req.body).then(function (locsSmithdb) {
            res.json(locsSmithdb);
        });
    });

    app.delete("/api/LocsSmith/:id", function (req, res) {
        db.LocsSmith.destroy({ where: { id: req.params.id } }).then(function (locsSmithdb) {
            res.json(locsSmithdb);
        });
    });


    //Put request for new review

    app.put("/api/LocsSmith/:id", function (req, res) {
        db.LocsSmith.update({
            username: req.body.username,
            password: req.body.password,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            addr: req.body.addr,
            phone: req.body.phone,
            email: req.body.email,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            clientRating: req.body.clientRating,
            braiding: req.body.braiding,
            hairlocs: req.body.hairlocs
        },
            {
                where: {
                    id: req.body.id
                }
            }).then(function (LocsSmith_db) {
                console.log("Success!")
                console.log(req.body.id)
                res.json(LocsSmith_db);
            });
    });
};