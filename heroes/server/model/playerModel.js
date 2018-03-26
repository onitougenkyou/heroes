var mongo = require('mongoose');

var Schema = mongo.Schema;

var playerSchema = new Schema({
  playerName: { type: String },
  class: {
    name: { type: String }
  }
});

module.exports = mongo.model('players', playerSchema);
