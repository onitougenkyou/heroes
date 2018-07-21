var mongo = require('mongoose');

var Schema = mongo.Schema;

var playerSchema = new Schema({
  accountName: { type: String },
  accountId: { type: String },
  id: { type: Number },
  name: { type: String },
  level: { type: Number },
  experience: { type: Number },
  isAlive: { type: Boolean },
  class: { type: String },
  attributs: {
    vie: { type: Number },
    force: { type: Number },
    endurance: { type: Number },
    chance: { type: Number },
    agilite: { type: Number },
    perception: { type: Number },
    intelligence: { type: Number }
  },
  description: { type: String },
  inventaire: {
    weapon: {
      name: { type: String },
      dammage: { type: Number },
      value: { type: Number },
      levelMin: { type: Number }
    },
    armor: {
      name: { type: String },
      defense: { type: Number },
      value: { type: Number },
      levelMin: { type: Number }
    },
    monney: { type: Number },
    sell: { type: Array }
  }
});

module.exports = mongo.model('players', playerSchema);
