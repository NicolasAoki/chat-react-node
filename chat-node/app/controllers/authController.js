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
//verifica se o email e' existente para resetar a senha
router.post('forgot_password', async (req,res) =>{
    //recebe o email 
    const { email } = req.body;
    try{
        const user = await User.findOne({ email });

        if(!user) 
            return res.status(400).send({error:"Usuario nao encontrado"});

        //redirecionar para resetar a senha
    }catch(err){
        res.status(400).send({error:"falha ao recuperar senha"});
    }
})
//reseta o password
router.post('/reset_password', async (req,res)=>{
    const { user, email, password } = req.body;

    try{
        //procura usuario pelo email
        const user = await User.findOne({ email });
        
        //se nao existe
        if(!user) 
            return res.status(400).send({error:"Usuario nao encontrado"});

        //se achou usuario, seta nova senha
        user.password = password;
        //salva nova senha no usuario
        await user.save();

        res.status(200).send({msg:"senha atualizada"})


    }catch(err){

    }
})
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