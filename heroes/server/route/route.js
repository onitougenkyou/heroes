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
      mod.class.attributes.strenght = req.body.strenght;
      mod.class.attributes.intelligence = req.body.intelligence;
      mod.class.attributes.agility = req.body.agility;
      mod.class.attributes.perception = req.body.perception;
      mod.class.attributes.luck = req.body.luck;
      mod.inventaire.weapon.name = req.body.weaponName;
      mod.inventaire.weapon.dammage = req.body.weaponDammage;
      mod.inventaire.weapon.value = req.body.weaponValue;
      mod.inventaire.weapon.levelMin = req.body.weaponLevelMin;
      mod.inventaire.armor.armorName = req.body.armorName;
      mod.inventaire.armor.armorDefense = req.body.armorDefense;
      mod.inventaire.armor.armorValue = req.body.armorValue;
      mod.inventaire.armor.armorLevelMin = req.body.armorLevelMin;
      mod.monney = req.body.monney;
      mod.sell = req.body.sell;

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
        experience: req.body.experience,
        class: {
          name: req.body.className,
          attributes: {
            pv: req.body.pv,
            strenght: req.body.strenght,
            intelligence: req.body.intelligence,
            agility: req.body.agility,
            perception: req.body.perception,
            luck: req.body.luck
          }
        },
        inventaire: {
          weapon: {
            name: req.body.weaponName,
            dammage: req.body.weaponDammage,
            value: req.body.weaponValue,
            levelMin: req.body.weaponLevelMin
          },
          armor: {
            name: req.body.armorName,
            defense: req.body.armorDefense,
            value: req.body.armorValue,
            levelMin: req.body.armorLevelMin
          },
          money: req.body.monney,
          sell: req.body.sell
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
