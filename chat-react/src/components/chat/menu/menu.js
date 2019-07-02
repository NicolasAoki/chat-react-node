import React, { Component } from 'react'
const axios = require('axios');
// axios.defaults.baseURL = 'http://localhost:3000/'
export default class menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
             usuarios:[]
        }
    }
    componentDidMount(){
        axios.defaults.headers.common = {'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMWE5MTkwZjUyZTgxMzRhM2Y3NzUxZiIsImlhdCI6MTU2MjEwOTA1NSwiZXhwIjoxNTYyMTk1NDU1fQ.IUsPjoIwqLs6wgbVmCOpTgLfzwLcCgrpzDJXg30blP4`}
        this.callApi();

    }
    callApi() {
        axios.get('http://localhost:3000/chat/listaMensagens')
          .then( response => {
            this.setState({usuarios:JSON.stringify(response)})
          })
          .catch()
      }
    render() {
        const users = this.state.usuarios.map(function(item){
            return <li> {item} </li>;
          });
        return (
            <div>
                {users}
            </div>
        )
    }
}
