import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';

import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.handleForm = this.handleForm.bind(this);
    }
    
    handleForm(e){
        e.preventDefault();
        const data = new FormData(e.target);
        console.log(data)
    }
    render() {

        return (
            <Container>
                <FormControl>
                    <form onSubmit={this.handleForm}>
                        <Input id="email" name="email" type="email" aria-describedby="email_input"/>
                        <FormHelperText id="email_input">Digite o email</FormHelperText>
     
                        <Input id="senha" name="senha" type="password" aria-describedby="password_input"/>
                        <FormHelperText id="password_input">Digite a senha</FormHelperText>
     
                        <button>Send data!</button>
                    </form>
                </FormControl>
     
              
            </Container>
        )
    }
}
