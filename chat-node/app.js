const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//importa as rotas de autenticacao e do projeto
require('./routes/index')(app);
require('./routes/project')(app);
app.listen(3000);

