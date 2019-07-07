import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import chat from './components/chat/Chat';
import login from './components/login/Login';
import notFound from './components/notFound/NotFound';
import menu from './components/chat/menu/Menu';

import AppBar from '@material-ui/core/AppBar';

import { isAuthenticated } from './auth';

//Verificacao se o usuario esta autenticado
const PrivateRoute = ({ component:Component, ...rest }) => (
  <Route {...rest } render={props=>(
      isAuthenticated.state ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{ pathname:'/', state:{ from: props.location }}}/>
      )
  )}/>
)

const routing = (
    <Router>
      <AppBar position="static">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        {/* <Link to="/chat/123">Chat</Link> */}
        <Link to="/menu">Menu</Link>
      </AppBar>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={login} />
        {/* <PrivateRoute path="/chat/:id" component={chat} /> */}
        <PrivateRoute path="/menu" component={menu}/>
        <Route component={notFound} />
      </Switch>
    </Router> 
  )
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
