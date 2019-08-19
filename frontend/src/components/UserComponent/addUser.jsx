import React, { Component } from 'react';
import Axios from 'axios';
import { CONSTANTS } from '../../config.js';
import { Link } from 'react-router-dom';

class AddUser extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            groups: [],
        };
    }

    onChange = (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
        this.setState({ [e.target.name]: e.target.value });
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

    render() { 
        const { name,groups } = this.state;
        return ( 
            <div className="col-sm-12  my-5">
                <div className="col col-sm-6 mx-auto">
                <Link to="/">
                    <a className="btn btn-info text-white my-1">Go Back</a>
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
                                        <input type="text" className="form-control" id="inputGroups" placeholder="Groups" name="groups" onChange={this.onChange} />
                                    </div>
                                </div>
                                <button href="#" className="btn btn-primary text-center">Add User</button>
                            </form>
                            
                        </div>
                    </div>
                </div>
                
            </div>
         );
    }
}
 
export default AddUser;