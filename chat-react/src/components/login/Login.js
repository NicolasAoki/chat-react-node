import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';

import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

export default class Login extends Component {
    
    render() {

        return (
            <Container>
            
                <FormControl>
            
                    <Input id="emailInput" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">Digite o usuário</FormHelperText>
     
      
                    <Input id="senhaInput" aria-describedby="my-helper-tex" />
                    <FormHelperText id="my-helper-tex">Digite sua senha</FormHelperText>

                    <Button variant="outlined" color="primary">
                        Entrar
                    </Button>
                    
                </FormControl>

              
            </Container>
        )
    }
}
