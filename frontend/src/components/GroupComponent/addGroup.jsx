import React, {Component} from 'react';
import Axios from 'axios';
import {CONSTANTS} from '../../config.js';
import {Link} from 'react-router-dom';
//import {Multiselect} from 'multiselect-react-dropdown';
import Select from 'react-select';

class AddGroup extends Component {
    
    state = {
        name: '',
        users: [],
        available_users: [ ]
    };

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        Axios
            .get(CONSTANTS.api_base_url + 'user')
            .then((result) => {
                let res_users = result.data;
                this.setState({available_users: res_users});
                console.log(this.state);
            });
    }

    handleChange = selectedOption => {
        this.setState({ users:selectedOption });
    }

    onChange = (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        console.log(this.state);
        // get our form data out of state
        const { name, users } = this.state;

        Axios
            .post(CONSTANTS.api_base_url + 'group', { name, users })
            .then((result) => {
                console.log(result);
                this
                    .props
                    .history
                    .push("/");
            });
       
    }

    

    render() {
        
        return (
            <div className="col-sm-12  my-5">
                <div className="col col-sm-12 col-md-6 mx-auto">
                    <Link to="/" className="btn btn-info text-white my-1">
                        Go Back
                    </Link>

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-center">Create New Group</h5>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputName"
                                            placeholder="Developers"
                                            name="name"
                                            onChange={this.onChange}
                                            />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputGroups" className="col-sm-2 col-form-label">Users</label>
                                    <div className="col-sm-10">
                                        <Select
                                            isMulti
                                            value={this.state.users}
                                            onChange={this.handleChange}
                                            options={this.state.available_users}
                                            getOptionLabel={(option) => option.name}
                                            getOptionValue={(option) => option.id}
                                        />
                                    </div>
                                </div>
                                <button href="#" className="btn btn-primary text-center">Add Group</button>
                            </form>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default AddGroup;