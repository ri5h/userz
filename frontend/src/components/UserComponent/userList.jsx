import React, {Component} from 'react';
import {CONSTANTS} from '../../config.js';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class UserList extends Component {

    state = {
        users: []
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        Axios
            .get(CONSTANTS.api_base_url + 'user')
            .then((result) => {
                this.setState({users: result.data});
                console.log(this.state);
            });
    }

    deleteUser = (id, name) => {
        var confirm = window.confirm("Are you sure you want to delete user " + name + " ?");
        if (confirm) {
            Axios
                .delete(CONSTANTS.api_base_url + 'user/' + id)
                .then((result) => this.getUsers());
        }

    }

    render() {
        const users = this.state.users;

        return (
            <div className="card">
                <div className="card-header">
                    <span className='h3'>Users</span>
                    <Link to={"/user/add"} className="btn btn-primary text-white float-right">
                        Add User </Link>
                    
                </div>
                <div className="card-body">

                    <table className="table ">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Groups</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.groups.length}</td>
                                    <td>
                                        <Link to={"/user/edit/"+ user.id} className="btn btn-sm btn-info text-white mx-2">
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-danger text-white mx-2"
                                            onClick={() => this.deleteUser(user.id, user.name)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}

export default UserList;