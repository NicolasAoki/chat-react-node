import React,{Component} from 'react';
import Login from './components/login/Login';
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
        </div>
    );
  }
}

export default App;
