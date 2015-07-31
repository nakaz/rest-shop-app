var config = require('./config/config.json');

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(bodyParser.urlencoded());

app.set('view engine', 'jade');
app.set('views', './views');

app.get('/', function (req, res){
  res.render('index');
});

var server = app.listen(config.port, displayServer);
function displayServer (){
  var host = server.address().address;
  var port = server.address().port;
  console.log('da app steh for tryin at http://%s:%s', host, port);
}