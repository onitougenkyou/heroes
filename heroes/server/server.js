var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongoose");
var route = require('./route/route');

var db = mongo.connect("mongodb://localhost:27017/player", function (err, response) {
  if (err) { console.log(err); }
  else { console.log('Connected to 27017 '); }
});


var app = express()
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});



// Appel des routes pour l'ajout, suppression, mise à jour et récupération des données présentes en base
app.use('/', route);

app.listen(8080, function () {

  console.log('Example app listening on port 8080!')
})  
