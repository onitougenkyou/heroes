// Définit les personnages jouables

var mongo = require('mongoose');

var Schema = mongo.Schema;

var characterSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  attributs: {
    vie: { type: Number },
    force: { type: Number },
    agilite: { type: Number },
    perception: { type: Number },
    intelligence: { type: Number },
    chance: { type: Number },
    endurance: { type: Number }
  },
  inventaire: {
    armor: {
      name: { type: String },
      defense: { type: Number },
      value: { type: Number },
      levelMin: { type: Number }
    },
    weapon: {
      name: { type: String },
      dammage: { type: Number },
      value: { type: Number },
      levelMin: { type: Number }
    },
    monney: { type: Number },
    sell: { type: Array }
  },
  description: { type: String },
});

module.exports = mongo.model('Character', characterSchema);
