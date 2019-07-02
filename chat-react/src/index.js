import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import chat from './components/chat/chat';
import login from './components/login/login';
import notFound from './components/notFound/notFound';
import menu from './components/chat/menu/menu';

const routing = (
    <Router>
      <div>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/Chat">Chat</Link>
            </li>
            <li>
              <Link to="/Menu">Menu</Link>
            </li>
        </ul>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={login} />
            <Route path="/chat/:id" component={chat} />
            <Route path="/menu" component={menu}/>
            <Route component={notFound} />
        </Switch>
     
      </div>
    </Router>
  )
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
