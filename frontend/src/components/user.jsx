import React, { Component } from 'react';

class User extends Component {
    state = {  }
    render() { 
        return ( 
            <tr>
                <td>{this.props.user.id}</td>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.groups}</td>
                <td>
                    <a className="btn btn-sm btn-info text-white mx-2">Edit</a>  
                    <a className="btn btn-sm btn-danger text-white mx-2">Delete</a>
                </td>
            </tr>
         );
    }
}
 
export default User;