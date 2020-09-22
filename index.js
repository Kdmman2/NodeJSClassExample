//require express
var express = require('express');
//create an express object, call express
var app = express();

//tell application to use EJS for templates
app.set('view engine', 'ejs');

//get for the home page /
app.get('/', function(req, res){
//return something to the home page
    res.send('Hello world!');
});
//set up server
app.listen(3000, function(){
    console.log('listening...');

});