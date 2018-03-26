var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongoose");

var db = mongo.connect("mongodb://localhost:27017/player", function (err, response) {
  if (err) { console.log(err); }
  else { console.log('Connected to 27017 '); }
});


var app = express()
app.use(bodyParser());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

player = require('./model/playerModel');
var model = mongo.model('players');


app.post("/api/SavePlayer", function (req, res) {
  var mod = new model(req.body);
  if (req.body.mode == "Save") {
    mod.save(function (err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.send({ data: 'is save' });
        console.log(data);
      }
    });
  }
  else {
    model.findByIdAndUpdate(req.body.id, { playerName: req.body.name },
      { className: req.body.class.name },
      function (err, data) {
        if (err) {
          res.send(err);
        }
        else {
          res.send({ data: "Player Update" });
        }
      });


  }
})

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



app.get("/api/getPlayer", function (req, res) {
  model.find({}, function (err, data) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(data);
      console.log('get', data)
    }
  });
})


app.listen(8080, function () {

  console.log('Example app listening on port 8080!')
})  
