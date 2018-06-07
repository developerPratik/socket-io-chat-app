import React from "react";
import { render } from "react-dom";
import { connect } from 'socket.io-client';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/login';
import App from './app';
import Provider from './provider';

render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/" component={App} />
        </Switch>
    </BrowserRouter>, document.getElementById('app'));