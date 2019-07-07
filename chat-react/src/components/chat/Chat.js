import React, { Component } from 'react';

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
        this.listaMensagens();
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

        }catch(e){
            console.log(e);
        }
    } 
    render() {

        return (
            <div>
                <div>FUNCIONA CHAT</div>
                <p>{this.state.destinatario}</p>
               <ul>
                    {this.state.mensagens.map((item,index)=>(
                        <li key={index}><p>{isAuthenticated.user.name}:</p>{item.mensagem}</li>
                    ))}
                </ul>
            </div>
        )
    }
}
