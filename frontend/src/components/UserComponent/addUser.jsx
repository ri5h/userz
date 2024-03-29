import React, { Component } from 'react';
import Axios from 'axios';
import { CONSTANTS } from '../../config.js';
import { Link } from 'react-router-dom';
import Select from 'react-select';

class AddUser extends Component {
    state = {
        name: '',
        groups: [],
        available_groups: []
    };

    componentDidMount() {
        this.getGroups();
    }

    onChange = (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update  state
        */
        this.setState({ [e.target.name]: e.target.value });
    }

    handleChange = selectedOption => {
        this.setState({ groups: selectedOption });
    }

    onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const { name, groups } = this.state;

        Axios.post(CONSTANTS.api_base_url + 'user', { name, groups })
            .then((result) => {
                console.log(result);
                this.props.history.push("/");
            });
    }

    getGroups = () => {
        Axios
            .get(CONSTANTS.api_base_url + 'group')
            .then((result) => {
                let res_groups = result.data.map( (group) => ({ "id": group.id, name: group.name }));
                this.setState({ available_groups: res_groups });
                //console.log(this.state);
            });
    }

    render() { 
        
        return ( 
            <div className="col-sm-12  my-5">
                <div className="col col-sm-6 mx-auto">
                    <Link to="/" className="btn btn-info text-white my-1">
                    Go Back
                </Link>
                    
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-center">Create New User</h5>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="inputName" placeholder="John Doe" name="name" onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="inputGroups" className="col-sm-2 col-form-label">Groups</label>
                                    <div className="col-sm-10">
                                        <Select
                                            isMulti
                                            value={this.state.groups}
                                            onChange={this.handleChange}
                                            options={this.state.available_groups}
                                            getOptionLabel={(option) => option.name}
                                            getOptionValue={(option) => option.id}
                                        />
                                    </div>
                                </div>
                                <button href="#" className="btn btn-primary text-center" disabled={ this.state.name.length === 0 ? "disabled" : false }>Add User</button>
                            </form>
                            
                        </div>
                    </div>
                </div>
                
            </div>
         );
    }
}
 
export default AddUser;