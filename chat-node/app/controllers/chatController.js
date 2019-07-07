//requisicoes http
const express = require('express');

const authMiddleware = require('../middleware/auth');
//importa o model User 
const User = require('../models/user');
//import o model Mensagem
const Mensagem = require('../models/mensagem');
//controle de rotas
const router = express.Router();

router.use(authMiddleware);


router.get('/',(req,res)=>{
    //req.userId so' esta disponivel por conta do middleware
    res.send({msg:'ok',user:req.userId});
});
//verifica todos usuarios
router.get('/users', async(req,res)=>{
   
    try{
        //procura todos usuarios
        const user = await User.find({});

        res.status(200).send(user);
        // res.status(200).send(JSON.stringify(user));
    }catch(err){
        res.status(400).send({error:"falha ao listar usuarios"});

    }
})

//salva mensagem entre 2 usuarios
router.post('/enviaMensagem/:id',async (req,res)=>{
    const { msg } = req.body;
    console.log(msg,req.params.id,req.userId);
    try{
        const mensagem = await Mensagem.create({
            mensagem:msg,
            destinatario:req.params.id,
            remetente: req.userId
        });
        res.status(200).send({msg:mensagem});

    }catch(err){
        res.status(400).send({error:`Falha ao salvar mensagem ${err}`})
    }
})

router.post('/listaMensagens',async(req,res)=>{
    try{
        const { destinatario, remetente } = req.body;
        console.log(destinatario,remetente)
        const msg = await Mensagem
                        .find({destinatario:destinatario,remetente:remetente})
        console.log(msg);
        res.status(200).send(msg);
    }catch(err){
        res.status(400).send({error:"Falha ao listar mensagens"})    
    }
})

module.exports = app => app.use('/chat',router);
