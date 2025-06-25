import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./TableUser.scss";
import * as actions from "../../../store/actions";

class TableUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users : []
        }
    }

    componentDidMount() {
       this.props.getAllUserStartAdmin();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.users !== this.props.users) {
            this.setState ({
                users:this.props.users
            })
        }
    }

    deleteUser =  (user) => {
        this.props.deleteUserStartAdmin(user.id);
    }

    updateUser =  () => {
       
    }

    render() {
        let users = this.state.users;
        return (
        <div className='table-users-container'>
            <div className='table-users-table mt-3 mx-1'>
            <table id="table-users">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                  {users && users.length > 0 && users.map( (user,index) => {
                    return(
                    <tbody key={user.id || index}> 
                        <tr>
                            <td>{user.email}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.address}</td>
                            <td>{user.phonenumber}</td>
                            <td>
                                <button className="btn-edit" onClick={() => this.handleUpdateNewUser()}><i className="fas fa-pencil-alt"></i></button>
                                <button className="btn-delete" onClick={(e) => {
                                  e.preventDefault();
                                  this.deleteUser(user);}}>
                                <i className="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    </tbody> 
                     )
                  }
                  )}        
                  
            </table>
            </div>
         </div>
        )
    } 

}

const mapStateToProps = state => {
    return {
      users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
      getAllUserStartAdmin: (() => dispatch(actions.getAllUserStart())),
      deleteUserStartAdmin: ((user) => dispatch(actions.deleteUserStart(user)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
