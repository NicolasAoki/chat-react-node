//import do filesystem manager do node
const fs = require('fs');
//import do controle de caminhos
const path = require('path');

//Ao inves de fazer o import de todos arquivos,
//chama-se somente o index.js
module.exports = app => {
    // percorre todas os arquivos da pasta atual (__dirname)
    // faz o filtro de todos arquivos nao comecados em . e nem sendo o proprio arquivo "index.js"
    // passa o require de cada arquivo
    fs
        .readdirSync(__dirname)
        .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.js")))
        .forEach(file => require(path.resolve(__dirname,file))(app));
}