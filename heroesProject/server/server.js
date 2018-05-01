const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
let data = require('./class');
const mongo = require("mongoose");


//var db = mongo.connect("mongodb://localhost:27017/player", function (err, response) {
//  if (err) { console.log(err); }
//  else { console.log('Connected to 27017 '); }
//});

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

auth.post('/register', (req, res) => {
  if (req.body) {
    const email = req.body.email.toLocaleLowerCase().trim();
    const password = req.body.password.toLocaleLowerCase().trim();
    const name = req.body.name.trim();
    users = [{ id: Date.now(), email: email, password: password, name: name }, ...users];
    res.json({ success: true, users: users });
  } else {
    res.json({ success: false, message: "Creation failure" });
  }
});

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

app.use('/api', api);
app.use('/auth', auth);


const port = 3000;

app.listen(port, () => {
  console.log('Listing on port ' + port);
});
