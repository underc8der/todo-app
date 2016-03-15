var mongoose = require('mongoose');

module.exports = mongoose.Schema({
  profile: {
    username: {
      type: String,
      required: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/
    },
    picture: {
      type: String,
      required: true,
      match: /^http:\/\//i
    }
  }
});

module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });
