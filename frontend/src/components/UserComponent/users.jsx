import React, {Component} from 'react';
import {CONSTANTS} from '../../config.js';
import User from './user';
import Axios from 'axios';

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

    deleteUser = (id,name) => {
        var confirm = window.confirm("Are you sure you want to delete user " + name + " ?");
        if (confirm) {
            Axios
                .delete(CONSTANTS.api_base_url + 'user/' + id)
                .then((result) => this.getUsers());
        }

    }

    render() {
        const users = this.state.users;
        const listUsers = users.map((user) => <User user={user} key={user.id} deleteUser={this.deleteUser}></User>);
        return (
            <div className="card">
                <div className="card-header">
                    <span className='h3'>Users</span>
                    <a
                        href={CONSTANTS.url.user.add}
                        className='btn btn-primary text-white float-right'>Add User</a>
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