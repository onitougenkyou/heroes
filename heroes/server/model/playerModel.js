var mongo = require('mongoose');

var Schema = mongo.Schema;

var playerSchema = new Schema({
  playerName: { type: String },
  class: {
    name: { type: String },
    attributes: {
      pv: { type: Number },
      strenght: { type: Number },
      intelligence: { type: Number },
      perception: { type: Number },
      agility: { type: Number },
      luck: { type: Number },
      endurance: { type: Number }
    }
  },
  inventaire: {
    weapon: {
      name: { type: String },
      value: { type: Number },
      dammage: { type: Number }
    },
    defense: {
      name: { type: String },
      defense: { type: Number },
      value: { type: Number }
    },
    gold: { type: Number },
    sell: { type: Array }
  }
});

module.exports = mongo.model('players', playerSchema);
