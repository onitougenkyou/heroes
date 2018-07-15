var mongo = require('mongoose');

var Schema = mongo.Schema;

var monsterSchema = new Schema({
  id: { type: Number },
  type: { type: String },
  name: { type: String },
  level: { type: Number },
  attributs: {
    pv: { type: Number },
    force: { type: Number },
    endurance: { type: Number },
    chance: { type: Number },
    agilite: { type: Number },
    perception: { type: Number },
    intelligence: { type: Number }
  },
  inventaire: {
    arme: {
      type: { type: String },
      dommage: { type: Number }
    },
    defense: {
      type: { type: String },
      defense: { type: Number }
    },
    monney: { type: Number },
    objetDrop: { type: Array }
  },
  description: { type: String },
  toto: { type: String }
});

module.exports = mongo.model('Monster', monsterSchema);
