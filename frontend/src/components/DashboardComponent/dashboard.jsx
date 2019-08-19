import React, { Component } from 'react';
import UserList from '../UserComponent/userList';
import GroupList from '../GroupComponent/groupList';

class Dashboard extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="row justify-content-center">
                <div className="col col-md-6 col-sm-12 my-2"><UserList /></div>
                <div className="col col-md-6 col-sm-12 my-2"><GroupList /></div>
            </div>
         );
    }
}
 
export default Dashboard;