import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from './components/Home/Home.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Detail from './components/Detail/Detail.jsx';
import SearchList from './components/SearchList/SearchList.jsx';

import styles from './styles/main.scss';

ReactDom.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/detail" component={Detail}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/dashboard" component={Dashboard}/>
        </Switch>
    </Router>,
    document.getElementById('react-app')
);
