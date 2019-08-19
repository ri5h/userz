import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import TopBanner from './components/topBanner';
import Dashboard from './components/DashboardComponent/dashboard';
import AddUser from './components/UserComponent/addUser';

function App() {
    return (
        <div className="MainApp">
            <TopBanner />
        <Router>
            
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/user/add" component={AddUser} />
            </Switch>
            
        </Router>
        </div>
    );
}

export default App;
