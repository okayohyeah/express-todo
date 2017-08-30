var express = require('express');
var expressLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var app = express();
var TodoList = require('./models').TodoList
var Todo = require('./models').Todo

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(expressLayouts)

app.get('/', function (request, response) {
  TodoList.findAll().then(function(todoLists){
    response.render('index', {todoLists: todoLists})
  }).catch(function(error){
    response.send("Error, couldn't fetch TodoLists")
  })
});

app.get('/todo-list/:id', function(request, response){
    console.log(request.params);
  TodoList.findById(request.params.id,
    {include: [{
      model: Todo,
      as: 'Todos'
    }]
  }).then(function(todoList){
    // "as" portion of the include above is looking for the table name - which is uppercase
    response.render('todo-list', {todoList: todoList, todos: todoList.Todos})
  }).catch(function(error){
      console.log(error);
    response.send("Error, couldn't fetch TodoList")
  })
})

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
