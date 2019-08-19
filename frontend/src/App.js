import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import TopBanner from './components/topBanner';
import Dashboard from './components/DashboardComponent/dashboard';
import AddUser from './components/UserComponent/addUser';
import AddGroup from './components/GroupComponent/addGroup';

function App() {
    return (
        <div className="dashboard">
            <TopBanner/>
            <div className="container">

                <Router>

                    <Switch>
                        <Route path="/" exact component={Dashboard}/>
                        <Route path="/user/add" component={AddUser}/>
                        <Route path="/group/add" component={AddGroup} />
                    </Switch>

                </Router>
            </div>
        </div>
    );
}

export default App;
