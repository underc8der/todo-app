var mongoose = require('mongoose');

var taskSchema = {
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: Integer,
    required: true,
    match: /[0|1]/
  },
  username: {
    type: mongoose.Schema.Types.ObjectId
  },
  revenue_date: {
    type: Date,
    required: true
  },
  lastupdate: {
    type: Date,
    required: true
  }
}

module.exports = new mongoose.Schema(taskSchema);
