import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';

import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

import {isAuthenticated} from '../../auth';
import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:3000',
    headers: {'Authorization': 'Bearer '+isAuthenticated.token}
})

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.handleForm = this.handleForm.bind(this);
        this.state = {
            users:{},
            tooltip:{
                text:'',
                error:false
            }
        }
    }
    
    handleForm = async(e) =>{
        e.preventDefault();
        const data = new FormData(e.target);

        await api.post('/auth/authenticate',{
            email: data.get('email'),
            password: data.get('password')
        })
        .then(res =>{
            // console.log(res.data.user,res.data.token)
            isAuthenticated.state=true;
            isAuthenticated.token=res.data.token;
            isAuthenticated.user=res.data.user;
            this.props.history.push('/menu');
        })
        .catch(err=>{
            if(err.request){
                console.log(err.request.response);
                const errObject = {
                    tooltip:{
                        text:err.request.response.error,
                        error:true
                    }
                }
                this.setState({tooltip:errObject.tooltip})
            }
        })

            
    }
    render() {

        return (
            <Container>
                <FormControl>
                    <form onSubmit={this.handleForm}>
                        <Input 
                            error={this.state.tooltip.error}
                            id="email" 
                            name="email" 
                            type="email" 
                            variant="outlined"
                            aria-describedby="email_input"
                        />
                        <FormHelperText id="email_input">Digite o email</FormHelperText>
     
                        <Input 
                            id="password" 
                            name="password" 
                            type="password" 
                            aria-describedby="password_input"
                        />
                        <FormHelperText id="password_input">Digite a senha</FormHelperText>
     
                        <button>Send data!</button>
                    </form>
                </FormControl>
     
              
            </Container>
        )
    }
}
