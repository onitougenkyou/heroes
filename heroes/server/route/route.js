var express = require('express');
app = express();

player = require('../model/playerModel');
var mongo = require("mongoose");
var model = mongo.model('players');


app.post("/api/savePlayer", function (req, res) {
    var mod = new model(req.body);
    // Création d'un nouveau perso
    if (req.body.mode == "Save") {
      mod.name = req.body.name;
      mod.level = req.body.level;
      mod.class.name = req.body.className;
      mod.class.attributes.pv = req.body.pv;

      console.log('MOD', mod);
      mod.save(function (err, data) {
        if (err) {
          res.send(err);
        }
        else {
          res.send({ data: 'is save' });
          console.log("DATA ==>", data)
        }
      });
    }
    else {
      // mise à jour du joueur
      var id = req.params.id;
      model.update(id, {
        name: req.body.name,
        level: req.body.level,
        class: {
          name: req.body.className,
          attributes: {
            pv: req.body.pv
          }
        }
      },
        function (err, data) {
          if (err) {
            res.send(err);
            console.log('Erreur lors de la mise à jour');
          }
          else {
            res.send({ data });
          }
        });

    }
  })

  // Suppression d'un perso
  app.post("/api/deletePlayer", function (req, res) {
    model.remove({ _id: req.body.id }, function (err) {
      if (err) {
        res.send(err);
      }
      else {
        res.send({ data: "Player delete" });
      }
    });
  })


  // Récupération de l'ensemble des perso
app.get("/api/getPlayer", function (req, res) {
  model.find({}, function (err, data) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

module.exports = app;
