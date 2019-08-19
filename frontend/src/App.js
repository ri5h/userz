import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import TopBanner from './components/topBanner';

import Dashboard from './components/DashboardComponent/dashboard';

import AddUser from './components/UserComponent/addUser';
import EditUser from './components/UserComponent/editUser';

import AddGroup from './components/GroupComponent/addGroup';
import EditGroup from './components/GroupComponent/editGroup';

function App() {
    return (
        <div className="dashboard">
            <TopBanner/>
            <div className="container">

                <Router>

                    <Switch>
                        <Route path="/" exact component={Dashboard}/>
                        <Route path="/user/add" component={AddUser} />
                        <Route path="/user/edit/:id" component={EditUser}/>
                        <Route path="/group/add" component={AddGroup} />
                        <Route path="/group/edit/:id" component={EditGroup} />
                    </Switch>

                </Router>
            </div>
        </div>
    );
}

export default App;
