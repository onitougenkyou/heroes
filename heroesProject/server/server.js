const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
let data = require('./class');
const mongo = require("mongoose");

// Models
var playerModel = require('./model/player');
var userModel = require('./model/user');
var classModel = require('./model/class');
var monsterModel = require('./model/monster');

// import model depuis mongoose
var model = mongo.model('players');
var user = mongo.model('User');
var classM = mongo.model('Class');
var monster = mongo.model('Monster');


var validator = require("email-validator");
const bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

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

app.use(bodyParser.json());


const api = express.Router();

const auth = express.Router();


// Connexion avec Token
auth.post('/login', (req, res) => {
  if (req.body) {
    const email = req.body.email.toLocaleLowerCase();
    var password = req.body.password;
    const index = users.findIndex(user => user.email === email);


    user.findOne({ email: req.body.email }, function (err, userInfo) {
      if (err) {
        console.log('erreur');
      } else {
        //Comparaison des mots de passe
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {

          // Check si l'utilisateur est un admin ou non
          if (user.email === 'admin') {
            token = jwt.sign({ iss: 'http://localhost:3000', role: userInfo.role, email: userInfo.email, name: userInfo.username }, secret);
          } else {
            token = jwt.sign({ iss: 'http://localhost:3000', role: userInfo.role, email: userInfo.email, name: userInfo.username }, secret);
          }
          res.json({ success: true, token: token });
        } else {
          res.status(401).json({ success: false, message: 'Identifiants incorrect' });
        }
      }
    });
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
    // Vérification que les mots de passe sont identiques
    if (password !== confirmPassword) {
      res.json({ success: false, message: { type: "Password", content: "Mauvaise correspondance entre les mots de passe" } });
    } if (!validator.validate(email)) {
      res.json({ success: false, message: { type: "Mail", content: "Format invalide" } })
    } else {
      // Récupération des données pour sauvegarde
      var userSchema = new user({
        email: req.body.email,
        username: req.body.name,
        password: req.body.password,
        role: "user"
      });

      // Sauvegarde de l'utilisateur
      userSchema.save(function (err) {
        if (err) {
          res.send(err);
          console.log("Une erreur c'est produite", err);
        } else {
          res.send({ user });
          console.log("Enregistrement bien effectuer");
        }
      });
    }
  } else {
    res.json({ success: false, message: "Creation failure" });
  }
});

// Récupérer les joueurs
api.get('/players', (req, res) => {
  classM.find({}, function (err, data) {
    if (err) {
      res.json({ success: false, message: "Une erreur est survenue lors de la récupération des classes" });
    } else {
      res.send(data);
    }
  });
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

// Ajout en base des classes jouable par le joueur
api.post('/players', (req, res) => {


  if (req.body) {
    var id = req.body.id;
    // Ajout des datas pour la classe
    var classSchema = new classM({
      id: req.body.id,
      name: req.body.name,
      attributs: {
        vie: req.body.attributs.vie,
        force: req.body.attributs.force,
        agilite: req.body.attributs.agilite,
        perception: req.body.attributs.perception,
        intelligence: req.body.attributs.intelligence,
        chance: req.body.attributs.chance
      },
      inventaire: {
        armor: {
          name: req.body.inventaire.armor.armorType,
          defense: req.body.inventaire.armor.armorResistance,
          value: req.body.inventaire.armor.armorValue,
          levelMin: req.body.inventaire.armor.armorLevel
        },
        weapon: {
          name: req.body.inventaire.weapon.weaponType,
          dammage: req.body.inventaire.weapon.weaponDammage,
          value: req.body.inventaire.weapon.weaponValue,
          levelMin: req.body.inventaire.weapon.weaponLevel
        },
        monney: req.body.inventaire.monney,
        sell: req.body.inventaire.sell
      },
      description: req.body.description
    });

    // Sauvegarde de l'utilisateur
    classSchema.save(function (err, data) {
      if (err) {
        console.log("Une erreur c'est produite", err);
        return res.json({ success: false, message: "Erreur lors de l'ajout" })
      } else {
        console.log("Enregistrement bien effectuer", data);
        return res.json({ success: true, message: "Classe bien ajoutée" })
      }
    });
  } else {
    return res.json({ success: false, message: "Creation failure" });
  }

});

api.get('/players/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  classM.findOne({ id: id }, function (err, classInfo) {
    if (err) {
      console.log('Erreur', err);
    } else {
      console.log('data', classInfo);
      res.json({ success: true, class: classInfo });
    }
  });
});


// Récupérer les monstres
api.get('/monsters', (req, res) => {
  monster.find({}, function (err, data) {
    if (err) {
      res.json({ success: false, message: "Une erreur est survenue lors de la récupération des monstres" });
    } else {
      res.send(data);
    }
  });
});


// Ajout de monstre en base de donnée
api.post('/monsters', (req, res) => {


  if (req.body) {
    var id = req.body.id;
    // Ajout des datas pour la classe
    var monsterSchema = new monster({
      id: req.body.id,
      type: req.body.type,
      name: req.body.name,
      level: req.body.level,
      attributs: {
        pv: req.body.attributs.pv,
        force: req.body.attributs.force,
        endurance: req.body.attributs.endurance,
        chance: req.body.attributs.chance,
        agilite: req.body.attributs.agilite,
        perception: req.body.attributs.perception,
        intelligence: req.body.attributs.intelligence
      },
      inventaire: {
        arme: {
          type: req.body.inventaire.weapon.weaponType,
          dommage: req.body.inventaire.weapon.weaponDammage
        },
        defense: {
          type: req.body.inventaire.armor.armorType,
          defense: req.body.inventaire.armor.armorResistance
        },
        monney: req.body.inventaire.monney,
        objetDrop: req.body.inventaire.objetDrop
      },
      description: req.body.description
    });

    // Sauvegarde de l'utilisateur
    monsterSchema.save(function (err, data) {
      if (err) {
        console.log("Une erreur c'est produite", err);
        return res.json({ success: false, message: "Erreur lors de l'ajout" })
      } else {
        console.log("Enregistrement de monstre bien effectuer", data);
        return res.json({ success: true, message: "Monstre bien ajoutée" })
      }
    });
  } else {
    return res.json({ success: false, message: "Creation failure" });
  }

});

// Récupération d'un monstre par son id
api.get('/monsters/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  monster.findOne({ id: id }, function (err, monsterInfo) {
    if (err) {
      console.log('Erreur', err);
    } else {
      console.log('data', monsterInfo);
      res.json({ success: true, monster: monsterInfo });
    }
  });
});

/**
 * Sauvegarde de nouveau joueur ou mise à jour si ID existe. 
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
        isAlive: req.body.isALive,
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
