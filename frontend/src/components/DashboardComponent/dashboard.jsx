import React, { Component } from 'react';
import Users from '../UserComponent/users';

class Dashboard extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="dashboard">
                <div className="col col-6 my-2"><Users /></div>
                <div className="sm-6"></div>
            </div>
         );
    }
}
 
export default Dashboard;