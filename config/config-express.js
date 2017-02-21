var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dateformate = require('dateformat');

module.exports = function(){
  var app = express();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static('./public'));
  app.use(expressValidator());

  consign()
   .include('controllers')
   .into(app);

  return app;
}
