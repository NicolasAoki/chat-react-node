const mongoose = require('../../database/db');

const MensagemSchema = new mongoose.Schema({
    mensagem:{
        type:String,
        require:true,
    },
    destinatario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true,
    },
    remetente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

const Mensagem = mongoose.model('Mensagem', MensagemSchema);

module.exports = Mensagem;