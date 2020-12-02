const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json'); 

var products = require('./model')  //Model
var controllers = require('./controllers'); //Controllers
var routes =require('./routes');   // Routes

app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('', routes);

// server port config
port = process.env.PORT || 3000;
app.listen(port);
console.log('API server started on: port' + port);