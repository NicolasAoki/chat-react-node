const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//importa as rotas de autenticacao e do projeto
require('./app/controllers/index')(app);

app.listen(3000);

