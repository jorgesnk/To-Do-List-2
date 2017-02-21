var app = require('./config/config-express')();

app.listen(8080, function(){
  console.log('Servidor rodando na porta 8080.');
});