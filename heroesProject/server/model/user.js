const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  playerId: { type: String },
  id: { type: String }
});


// hash user password before saving into database
UserSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
