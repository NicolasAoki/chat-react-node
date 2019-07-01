const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json')

//valicao do token
module.exports = (req,res,next)=>{
    // recebe o token 
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({error:"Sem token"});

    //separacao do Barrer de autenticaco
    //com o token 
    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({error:"token invalido"});
    
    // receber o primeiro valor em scheme
    // recebe o segundo valor em token
    const [ scheme, token ] = parts;

    //verifica com regex se 
    //scheme contem a string Bearer
    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({error:"Token mal formado"})
    
    //se passou por todas verificacoes agora e' necessario
    //conferir se o token esta valido
    //decoded sao os parametros recebido na requisicao
    jwt.verify(token,authConfig.secret,(err,decoded)=>{
        if(err) return res.status(401).send({error:"Token invalido"});

    //o atributo id so' existe pelo res.send({token:generateToekn({id:user.id})})
    // que esta sendo passado no middleware
    req.userId = decoded.id;
    return next();

    });
}