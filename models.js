var mongoose = require('mongoose');
var _ = require('underscore');

module.exporss = function(wagner){
  mongoose.connect('mongodb://localhost:27017/todo-core'),

  wagner.factory('db', function(){
    return mongoose;
  });

  //all necesary models for communicate with db
  var User = mongoose.model('User', require('./user'), 'users');
  var Task = mongoose.model('Task', require('./task'), 'tasks');

  var models = {
    User: User,
    Task: Task
  };

  _.each(models, function(value, key){
    wagner.factory(key, function(){
      return value;
    });
  });
}
