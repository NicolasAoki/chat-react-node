import React, { Component } from 'react';
import './Chat.css';
import { isAuthenticated } from '../../auth';
const axios = require('axios');

const api = axios.create({
    baseURL:'http://localhost:3000'
})
export default class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
             mensagens:[],
             destinatario:''
        }
    }
    componentWillMount(){
        const { params }  = this.props.match;
        console.log(params)
        this.setState({destinatario:params.id});
    }
    componentDidMount(){
        setInterval(() => {
            this.listaMensagens();
           }, 1000)
       
    }

    listaMensagens = async() => {
        try{
            var data = { 
                'remetente': isAuthenticated.user._id,
                'destinatario':this.state.destinatario
              }
              var headers = {
                "Content-Type": "application/json",
                headers: { 'Authorization': 'Bearer ' + isAuthenticated.token }
              }
            const { data:msg } =
                await api.post('/chat/listaMensagens',data,headers)

            this.setState({ mensagens:msg });
            this.scrollToBottom();
        }catch(e){
            console.log(e);
        }
    } 
    async enviaMensagem(msg){
        try{
            var data = { 
                'msg':msg,
                'remetente': isAuthenticated.user._id,
                'destinatario':this.state.destinatario
              }
              var headers = {
                "Content-Type": "application/json",
                headers: { 'Authorization': 'Bearer ' + isAuthenticated.token }
              }
            const { mensagemAdicionada } =
                await api.post('/chat/enviaMensagem/'+data.destinatario,data,headers)
            if(mensagemAdicionada)
              this.setState({mensagens:[...this.state.mensagens,mensagemAdicionada]})

        }catch(e){

        }
    }
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.enviaMensagem(event.target.value);
        }
    }
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    render() {

        return (
            <div>
                <div>FUNCIONA CHAT</div>
                <p>{this.state.destinatario}</p>
               <ul id="painelChat">
                    {this.state.mensagens.map((item,index)=>(
                        <li key={index}>
                            <p>{isAuthenticated.user._id === item.remetente ? isAuthenticated.user.name : 'Amigo'}:</p>
                            {item.mensagem}
                        </li>
                    ))}
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </ul>
                <input type="text" id="one" onKeyPress={this.handleKeyPress} />
                
            </div>
        )
    }
}
