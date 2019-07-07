import React, { Component } from 'react'

import {isAuthenticated} from '../../../auth';

const axios = require('axios');

const api = axios.create({
    baseURL:'http://localhost:3000'
})
export default class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
             users:[],
             mensagens:[]
        }
    }

    listaMensagens = async() => {
        try{
            const { data:msg } = await api.get('/chat/listaMensagens',{ headers: { Authorization: 'Bearer '+isAuthenticated.token } })
            
            console.log(this.state.mensagens);
            this.setState({ mensagens:msg });
            console.log(this.state.mensagens);
        }catch(e){
            console.log(e);
        }
    } 

    listaUsuarios = async() => {
        try{
            const { data:usuarios } = await api.get('/chat/users',{ headers: { Authorization: 'Bearer '+isAuthenticated.token } })
            
            this.setState({ users:usuarios });
            console.log(this.state.users);
        }catch(e){
            console.log(e);
        }
    } 
    render() {
        return (
            <div>
                <button onClick={this.listaMensagens}>Lista mensagens</button>
                <ul>
                    {this.state.mensagens.map((item,index)=>(
                        <li key={index}>{item.mensagem}</li>
                    ))}
                </ul>
                <button onClick={this.listaUsuarios}>Lista usuarios</button>
                <ul>
                    {this.state.users.map((item,index)=>(
                        <li key={index}>{item.name} {item.email}</li> 
                    ))}
                </ul>
            </div>
        )
    }
}
