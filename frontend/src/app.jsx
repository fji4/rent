import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch,browserHistory } from 'react-router-dom';

import Home from './components/Home/Home.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import SubleaseForm from './components/SubleaseForm/SubleaseForm.jsx';
import WatchList from './components/WatchList/watchList.jsx';
import History from './components/History/History.jsx';
import Account from './components/Account/Account.jsx';
import Notifications from './components/Notifications/Notifications.jsx';

import Detail from './components/Detail/Detail.jsx';
import SearchList from './components/SearchList/SearchList.jsx';


import styles from './styles/main.scss';
 

ReactDom.render(
    <Router history={ browserHistory }>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/account" component={Account}/>
            <Route exact path="/detail" component={Detail}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/sublease" component={SubleaseForm}/>
            <Route exact path='/watchlist' component = {WatchList}/>
            <Route exact path='/history' component={History} />
            <Route exact path='/notifications' component={Notifications} />
            <Route exact path="/searchlist" component={SearchList}/>

        </Switch>
    </Router>,
    document.getElementById('react-app')
);
