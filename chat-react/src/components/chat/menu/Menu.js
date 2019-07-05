import React, { Component } from 'react'
// import { async } from 'q';
const axios = require('axios');
// axios.defaults.baseURL = 'http://localhost:3000/'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMWE5MTkwZjUyZTgxMzRhM2Y3NzUxZiIsImlhdCI6MTU2MjI3MjU5NiwiZXhwIjoxNTYyMzU4OTk2fQ.lZV1nFUXskvsIa6VD2ZLchF7QHchn69_Ro4Jwsr5J6s';
const api = axios.create({
    baseURL:'http://localhost:3000',
    headers: {'Authorization': 'Bearer '+token}
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
            const { data:msg } = await api.get('/chat/listaMensagens')
            
            console.log(this.state.mensagens);
            this.setState({ mensagens:msg });
            console.log(this.state.mensagens);
        }catch(e){
            console.log(e);
        }
    } 

    listaUsuarios = async() => {
        try{
            const { data:usuarios } = await api.get('/chat/users')
            
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
