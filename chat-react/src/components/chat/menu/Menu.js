import React, { Component } from 'react'

import {isAuthenticated} from '../../../auth';

import { Link } from 'react-router-dom';
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
            const { data:msg } = await api.post('/chat/listaMensagens',{ headers: { Authorization: 'Bearer '+isAuthenticated.token } })
            
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
    abreChat(id){
        try{
            console.log(id)
            const path='/chat/'+id;
            this.props.history.push(path);
        }catch(e){
            console.log(e);
        }
    }
    render() {
        return (
            <div>
                <button onClick={this.listaUsuarios}>Lista usuarios</button>
                <ul>
                    {this.state.users.map((item,index)=>(
                        <li key={index} onClick={ () => this.abreChat(item._id) }>{item.email}</li> 
                    ),true)}
                </ul>
            </div>
        )
    }
}
