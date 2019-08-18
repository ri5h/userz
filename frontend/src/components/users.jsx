import React, {Component} from 'react';
import {CONSTANTS} from '../config.js';
import User from './user.jsx';

class Users extends Component {

    state = {
        users: []
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        fetch(CONSTANTS.api_base_url + 'user')
            .then(res => res.json())
            .then((result) => {
                this.setState({users: result});
                console.log(this.state);
            });
    }

    render() {
        const users = this.state.users;
        const listUsers = users.map((user) => <User user={user} key={user.id}></User>);
        return (
            <div className="card">
                <div className="card-header">
                    <span className='h3'>Users</span>
                    <a className='btn btn-primary text-white float-right'>Add User</a>
                </div>
                <div className="card-body">
                    
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Groups</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {listUsers}
                    </table>
                </div>
            </div>

        );
    }
}

export default Users;