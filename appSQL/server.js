var express = require('express'),
  app = express(),
  port = 3000,
  bodyParser = require('body-parser');
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit:'50mb'}));

var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route

app.listen(port);
console.log('Servidor iniciado en el puerto: ' + port);