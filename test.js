var assert = require('assert');
var wagner = require('wagner-core');

/**
 * this test suite is going to interact with the model and the persistance of
 * todo-app cheking that all the CRUD functions works as is expected
 */
describe('dbInterface', function(){
  var succeeded = 0;
  var works = 1;
  //models variables
  var User;
  var Task;


  beforeEach(function(done){
    var users = [
      profile: {
        username: 'usertest',
        password: 'Test123',
        picture: 'https://cdn4.iconfinder.com/data/icons/REALVISTA/project_managment/png/128/tester.png',
      },
      profile: {
        username: 'superuser',
        password: 'Super123',
        picture: 'https://cdn4.iconfinder.com/data/icons/REALVISTA/project_managment/png/128/tester.png',
      },
      profile: {
        username: 'usertest2',
        password: 'Test123',
        picture: 'https://cdn4.iconfinder.com/data/icons/REALVISTA/project_managment/png/128/tester.png',
      }
    ];
    User.insert(users, function(err){
      assert.ifError(err);
      done();
    });
  });

  /**
  * this is going to check if the user exist
  */
  it('does the user exist',function(done){
    var query = {'profile.username': 'usertest'};
    Task.findOne(query, 'status', function(err, doc){
      assert.ifError(err);
      assert.equal(query.profile.username, docs.profile.username);
      ++succeeded;
      done();
    });
  });

  beforeEach(function(done){
    done();
  });

  /**
  * this is going to check if task is inserted witout any problem
  */
  it('can insert a todo task',function(done){
    var todo = {
      title: 'todo-test: create a task test',
      description: 'correctly created the new todo task',
      status: 0,
      username: 'usertest2',
    };

    User.create(todo, function(err){
      assert.ifError(err);
      ++succeeded;
      done();
    });

  });

  beforeEach(function(done){
    done();
  });

  /**
  * this is going to check if task can be complete
  */
  it('can complete a todo task',function(done){
    var query = {title: 'todo-test: create a task test', username: 'usertest2'};
    var update = {status: 1};
    Task.update(query, update, function(err, updated){
      assert.ifError(err);
      Task.find(query, 'status', function(err, docs){
        assert.ifError(err);
        assert.equal(1, docs[0]);
        ++succeeded;
        done();
      });
    });
  });

  beforeEach(function(done){
    var todos = [{
        title: 'Tarea prueba 3',
        description: 'ejemplo 3',
        status: 0,
        username: 'usertest',
        revenue_date: new Date(),
        lastupdate: new Date()
      },
      {
        title: 'Tarea prueba 2',
        description: 'ejemplo 2',
        status: 1,
        username: 'usertest',
        revenue_date: new Date(),
        lastupdate: new Date()
      },
      {
        title: 'Tarea prueba 1',
        description: 'ejemplo 1',
        status: 1,
        username: 'superuser',
        revenue_date: new Date(),
        lastupdate: new Date()
      },
    ];
    User.insert(todos, function(err){
      assert.ifError(err);
      done();
    });
  });

  /**
  * check if a list of task comes ordered by his date
  * TODO: restrict the test for users
  */
  it('return a list of todo-task ordered by his update date', function(done){
    Task.find({}).sort('-revenue_date').exec(function(err, docs){
      assert.ifError(err);
      assert.equal('Tarea prueba 3', docs[0].title);
      assert.equal('Tarea prueba 2', docs[1].title);
      assert.equal('Tarea prueba 1', docs[2].title);
      Task.remove({}, function(err){
        assert.ifError(err);
        ++succeeded;
        done();
      });
    });
  });

  /**
  * this function is util for settting up all the arguments and parameterization
  * necesary for this work
  */
  before(function(){

    //make models available in test
    var deps = wagner.invoke(function(User, Task){
      {
        User: User,
        Task: Task
      };

      User = deps.User;
      Task = deps.Task;
    });
  });

  /**
  * this function is going to be executed afer complete all the task implemented
  * within the test suite
  */
  after(function(done){
    if(succeeded >= works){

    } else {

    }
  });
});
