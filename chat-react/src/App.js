import React,{Component} from 'react';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
class App extends Component {
  render(){
      return (
        <div>
          APP ROOT
          <Button component={Link} to="/login">
            Logue no sistema
          </Button>
          <Button component={Link} to="/cadastrar">
            Cadastrar
          </Button>
        </div>
    );
  }
}

export default App;
