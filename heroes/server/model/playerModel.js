var mongo = require('mongoose');

var Schema = mongo.Schema;

var playerSchema = new Schema({
  id: {type: Number},
  name: { type: String },
  level: { type: Number },
  experience: { type: Number },
  isAlive: { type: Boolean },
  class: {
    name: { type: String },
    attributes: {
      pv: { type: Number },
      strenght: { type: Number },
      intelligence: { type: Number },
      agility: { type: Number },
      perception: { type: Number },
      luck: { type: Number }
    }
  },
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
