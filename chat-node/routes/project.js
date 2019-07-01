//requisicoes http
const express = require('express');

const authMiddleware = require('../middleware/auth')

//controle de rotas
const router = express.Router();

router.use(authMiddleware);


router.get('/',(req,res)=>{
    //req.userId so' esta disponivel por conta do middleware
    res.send({msg:'ok',user:req.userId});
});

module.exports = app => app.use('/project',router);
