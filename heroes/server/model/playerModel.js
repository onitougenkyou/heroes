var mongo = require('mongoose');

var Schema = mongo.Schema;

var playerSchema = new Schema({
  name: { type: String },
  level: { type: Number },
  class: {
    name: { type: String },
    attributes: {
      pv: { type: Number }
    }
  }

});

module.exports = mongo.model('players', playerSchema);
