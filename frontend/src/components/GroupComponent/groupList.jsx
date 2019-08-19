import React, {Component} from 'react';
import {CONSTANTS} from '../../config.js';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class GroupList extends Component {
    state = {
        groups: []
    }

    componentDidMount() {
        this.getGroups();
    }

    getGroups = () => {
        Axios
            .get(CONSTANTS.api_base_url + 'group')
            .then((result) => {
                console.log(result);
                this.setState({groups: result.data});
            });
    }

    deleteGroup = (id, name) => {
        var confirm = window.confirm("Are you sure you want to delete group " + name + " ?");
        if (confirm) {
            Axios
                .delete(CONSTANTS.api_base_url + 'group/' + id)
                .then((result) => this.getGroups());
        }

    }

    render() {
        const groups = this.state.groups;
        return (
            <div className="card">
                <div className="card-header">
                    <span className='h3'>Groups</span>
                    <Link to={"/group/add"} className="btn btn-primary text-white float-right">
                        Add Group </Link>
                </div>
                <div className="card-body">

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Users</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map(group => (
                                <tr key={group.id}>
                                    <td>{group.id}</td>
                                    <td>{group.name}</td>
                                    <td>{group.users.length}</td>
                                    <td>
                                        <Link to={"/group/edit/" + group.id} className="btn btn-sm btn-info text-white mx-2">
                                            Edit
                                        </Link>
                                        <button
                                            disabled={ group.users.length > 0 ? "disabled" : false}
                                            className="btn btn-sm btn-danger text-white mx-2"
                                            onClick={() => this.deleteGroup(group.id, group.name)}>Delete</button>
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

export default GroupList;