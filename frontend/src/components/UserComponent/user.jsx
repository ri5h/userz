import React, { Component } from 'react';

class User extends Component {
    


    render() { 
        const user = this.props.user;
        return ( 
            <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.groups}</td>
                <td>
                    <button className="btn btn-sm btn-info text-white mx-2">Edit</button>   
                    <button className="btn btn-sm btn-danger text-white mx-2" onClick={() => this.props.deleteUser(user.id, user.name)} >Delete</button> 
                </td>
            </tr>
         );
    }
}
 
export default User;