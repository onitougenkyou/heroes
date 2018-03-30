var express = require('express');
app = express();

player = require('../model/playerModel');
var mongo = require("mongoose");
var model = mongo.model('players');

/**
 * Sauvegarde de nouveau joueur ou mise à jour si aucun ID n'existe. 
 */
app.post("/api/savePlayer", function (req, res, next) {
  var id = req.body.id;
  model.findOne({ _id: id }, function (err, player) {
    if (player !== null) {
      model.findOneAndUpdate({ _id: req.body.id }, {
        //mise à jour du player avec l'ensemble de ses données récupérer du body pour la mise à jour
        name: req.body.name,
        level: req.body.level,
        experience: req.body.experience,
        class: {
          name: req.body.class.name,
          attributes: {
            pv: req.body.class.attributes.pv,
            strenght: req.body.class.attributes.strenght,
            intelligence: req.body.class.attributes.intelligence,
            agility: req.body.class.attributes.agility,
            perception: req.body.class.attributes.perception,
            luck: req.body.class.attributes.luck
          }
        },
        inventaire: {
          weapon: {
            name: req.body.inventaire.weapon.name,
            dammage: req.body.inventaire.weapon.dammage,
            value: req.body.inventaire.weapon.value.value,
            levelMin: req.body.inventaire.weapon.levelMin
          },
          armor: {
            name: req.body.inventaire.armor.name,
            defense: req.body.inventaire.armor.defense,
            value: req.body.inventaire.armor.value.value,
            levelMin: req.body.inventaire.armor.levelMin
          },
          money: req.body.inventaire.monney.value,
          sell: req.body.inventaire.sell
        }

      }, function (err, data) {
        if (err) {
          res.send(err);
          console.log('Erreur lors de la mise à jour',err);
        }
        else {
          res.send({ data });
        }
      });
      console.log("Mise à jour réussi");
    } else {
      var p = new model({
        // Création d'un nouveau player avec l'ensemble de ses données
        name: req.body.name,
        level: req.body.level,
        experience: req.body.experience,
        class: {
          name: req.body.class.name,
          attributes: {
            pv: req.body.class.attributes.pv,
            strenght: req.body.class.attributes.strenght,
            intelligence: req.body.class.attributes.intelligence,
            agility: req.body.class.attributes.agility,
            perception: req.body.class.attributes.perception,
            luck: req.body.class.attributes.luck
          },
          description: req.body.class.description
        },
        inventaire: {
          weapon: {
            name: req.body.inventaire.weapon.name,
            dammage: req.body.inventaire.weapon.dammage,
            value: req.body.inventaire.weapon.value.value,
            levelMin: req.body.inventaire.weapon.levelMin
          },
          armor: {
            name: req.body.inventaire.armor.name,
            defense: req.body.inventaire.armor.defense,
            value: req.body.inventaire.armor.value.value,
            levelMin: req.body.inventaire.armor.levelMin
          },
          money: req.body.inventaire.monney.value,
          sell: req.body.inventaire.sell
        }
        
      }); // Sauvegarde du player, on check les éventuelles erreurs au passage
      p.save(function (err) {
        if (err) {
          res.send(err);
          console.log('Erreur rencontrée', err);
        } else {
          res.send({ player });
          console.log('Nouvelle entrée faite');
        }
      })
    }
  })
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
