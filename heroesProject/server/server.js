const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
let data = require('./class');
const mongo = require("mongoose");
player = require('./model/player');
user = require('./model/user');
var model = mongo.model('players');
var user = mongo.model('User');
var validator = require("email-validator");

// Connexion vers la base de données NoSQL
var db = mongo.connect("mongodb://localhost:27017/player", function (err, response) {
  if (err) { console.log(err); }
  else { console.log('Connected to 27017 '); }
});

let initialClass = data.class;
let addedClass = [];

users = [
  { id: 1, email: 'admin', name: "admin", password: 'admin', role: 'admin' },
  { id: 1, email: 'test', name: "Fake", password: 'test', role: 'user' }
];
const secret = "dsffdgq785q1sdqfdsfq4561sdf23qsdqsdjhlkjmq1";

const getAllClass = () => {
  return [...addedClass, ...initialClass];
}

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');
  next();

});

const api = express.Router();

const auth = express.Router();


// Connexion avec Token
auth.post('/login', (req, res) => {
  if (req.body) {
    const email = req.body.email.toLocaleLowerCase();
    const password = req.body.password.toLocaleLowerCase();
    const index = users.findIndex(user => user.email === email);
    if (index > -1 && users[index].password === password) {
      let user = users[index];
      let token = '';
      console.log('User ------- ', user)
      if (user.email === 'admin') {
        token = jwt.sign({ iss: 'http://localhost:3000', role: 'admin', email: req.body.email, name: user.name }, secret);
      } else {
        token = jwt.sign({ iss: 'http://localhost:3000', role: 'user', email: req.body.email, name: user.name }, secret);
      }
      res.json({ success: true, token: token });
    } else {
      res.status(401).json({ success: false, message: 'Identifiants incorrect' });
    }
  } else {
    res.status(500).json({ success: false, message: "Données manquantes" });
  }
});

// Inscription

auth.post('/register', (req, res) => {
  if (req.body) {
    const email = req.body.email.toLocaleLowerCase().trim();
    const password = req.body.password.toLocaleLowerCase().trim();
    const confirmPassword = req.body.confirmPassword.toLocaleLowerCase().trim();
    const name = req.body.name.trim();
    if (password !== confirmPassword) {
      res.json({ success: false, message: { type: "Password", content: "Mauvaise correspondance entre les mots de passe"} });
    } if (!validator.validate(email)) {
      res.json({ success: false, message: { type: "Mail", content: "Format invalide"} })
    } else {
      users = [{ id: Date.now(), email: email, password: password, name: name }, ...users];
      res.json({ success: true, users: users });
    }
  } else {
    res.json({ success: false, message: "Creation failure" });
  }
});

// Récupérer les joueurs du fichier json
api.get('/players', (req, res) => {
  res.json(getAllClass());
});

const checkUserToken = (req, res, next) => {
  if (!req.header('authorization')) {
    return res.status(400).json({ success: false, message: "Autorisation refusé" });
  }
  const authorizationParts = req.header('authorization').split(' ');

  let token = authorizationParts[1];
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Token non valide' })
    } else {
      next();
    }
  });
  next();
}


api.post('/players', checkUserToken, (req, res) => {
  const perso = req.body;
  addedClass = [perso, ...addedClass];
  res.json(perso);
});


api.get('/players/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const perso = getAllClass().filter(j => j.id === id);
  if (perso.length === 1) {
    res.json({ success: true, class: perso[0] });
  } else {
    res.json({ success: false, message: 'Une erreur est survenue, le personnage demander n\'existe pas' });
  }

});


/**
 * Sauvegarde de nouveau joueur ou mise à jour si aucun ID n'existe. 
 */
app.post("/api/savePlayer", function (req, res, next) {
  console.log('coucou route save');
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
          console.log('Erreur lors de la mise à jour', err);
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

app.use('/api', api);
app.use('/auth', auth);


const port = 3000;

app.listen(port, () => {
  console.log('Listing on port ' + port);
});
