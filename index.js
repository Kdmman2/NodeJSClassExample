var express = require('express');
var mongoose = require('mongoose');
//require body-parser
var bodyParser = require("body-parser");
//create express object, call express
var app = express();
const port = process.env.PORT || 3000;
//tell application to use EJS for templates
app.set('view engine', 'ejs');
//make styles public
app.use(express.static('public'));
//tell app to use Body parser
app.use(bodyParser.urlencoded({extended: true}));


//Connection information for Mongo
const Todo = require('./models/todo.model');
const mongoDB = 'mongodb+srv://testConnection:b8RwqJYgo4hD1xhe@nodetodoexample-iqnde.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '))
//Couple of items todo
var tasks = ["Procrastinate", "Do homework last minute"];

//completed items
var completed = ["extra work"];

//get home page /
app.get('/', function(req, res){

    Todo.find(function(err, todo){
        if(err){
            console.log(err);
        }
        else{
            for(i=0; i<todo.length; i++){
                if(todo[i].done){
                    completed.push(todo[i].item);
                }
                else{
                    tasks.push(todo[i].item);
                }
            }
        }
    });
    //return something to home page
    res.render('index', {tasks: tasks, completed: completed}); //add completed variable to ejs ex {a:a, b:b}
});

//add post method /addtask
app.post('/addtask', function(req, res){
    var newTask = req.body.newtask;
    tasks.push(newTask);
    //return index
    res.redirect('/');
});

app.post('/removetask', function(req, res){
    var removeTask = req.body.check;
    //push to completed
    if(typeof removeTask === 'string'){
        tasks.splice(tasks.indexOf(removeTask), 1);
    }else if(typeof removeTask === 'object'){
        for (var i = 0; i < removeTask.length; i++){
            tasks.splice(tasks.indexOf(removeTask[i]), 1);
        }
    }
    res.redirect('/');
});

//server setup
app.listen(port, function(){
    console.log('Listening on '+port)
});