//requisicoes http
const express = require('express');
//Configuracoes das rotas da aplcacao
const router = express.Router();
//importa o model User 
const User = require('../models/user')
//biblioteca para encriptar
const bcrypt = require('bcrypt');
//bibliote para o token de autenticacao
const jwt = require('jsonwebtoken')
//hash md5 token unico
const authToken = require('../../config/auth')
router.get('/', (req,res)=>{
    res.send({msg:'Server running'});
});
//rota de registro de um novo usuario
router.post('/register', async (req,res)=>{
    //Recebe o email do req.body
    const { email } = req.body;
    try{
        //verificar se o email é existente
        if(await User.findOne({email}))
            return res.status(400).send({error:'Email ja existente'});

        //Adiciona um novo usuarios
        const user = await User.create(req.body);
        //retorna os dados do usuario adicionado
        //junto com o token
        return res.send({
            user,
            token:generateToken({id: user.id}),
        })
    
    }catch(err){
        //Caso ocorra algum erro no processo
        return res.status(400).send({error:err});
    }
});
//faz a autenticacao do usuario 
router.post('/authenticate', async(req,res)=>{
    //recebe o email e a senha do req.body
    const {email,password}=req.body;
    //verifica existencia do email ja junto com a senha
    const user = await User.findOne({email}).select('+password');

    //se nao acha nenhum usuario com aquele email
    if(!user)
        return res.status(400).send({error:'usuario nao encontrado'});
    
    //compara a senha criptografada com a do banco
    //await pois nao se obtem a resposta imediata
    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({error:'senha invalida'});
    
    //gera o token unico a partir do id do usuario
    const token = jwt.sign({ id: user.id }, authToken.secret,{
        //expira em 1 dia
        expiresIn: 86400,
    });
    //redireciona o usuario
    //junto com o token
    res.send({
        user,
        token:generateToken({id: user.id})
    });
        
})

function generateToken(params = {}){
    return jwt.sign(params, authToken.secret,{
        //expira em 1 dia
        expiresIn: 86400,
    });
}
module.exports = app => app.use('/auth',router);