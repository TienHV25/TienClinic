import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./UserManage.scss";
import ModalUser from './ModalUser';
import ModalUserUpdate from './ModalUserUpdate';
import { handleGetAllUser , handleCreateUser, handleDeleteUser, handleUpdateUser } from '../../services/userService';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers : [],
            isOpenModal : false,
            isOpenModalUpdate : false,
            userEdit: {}
        }
    }

    getAllUser = async () => {
        let response = await handleGetAllUser('ALL');
        if(response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            });
        }
    }

    async componentDidMount() {
        this.getAllUser()
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModal : true
        })
    }

    handleUpdateNewUser = (userData) => {
        this.setState({
            isOpenModalUpdate : true,
            userEdit:{
              id:userData.id,
              ...userData

            }
        })
    }


    handleToggle = () => {
        this.setState({
            isOpenModal : !this.state.isOpenModal
        })
    }

    handleToggleUpdate = () => {
        this.setState({
            isOpenModalUpdate : !this.state.isOpenModalUpdate
        })
    }

    createUser = async (userData) => {
        let response = await handleCreateUser(userData);
        if(response && response.errCode === 0) {
            this.getAllUser();
            this.setState({
             isOpenModal : false
            })
        } else if (response && response.errCode !== 0) {
            alert(response.message);
        }

    }

    deleteUser = async (userID) => {
        let response = await handleDeleteUser(userID);
        if(response && response.errCode === 0) {
            this.getAllUser();
        } else if (response && response.errCode !== 0) {
            alert(response.message);
        }
    }

    updateUser = async (userData) => {
        let response = await handleUpdateUser(userData);
        if(response && response.errCode === 0) {
            this.getAllUser();
            this.setState({
             isOpenModalUpdate : false
            })
        } else if (response && response.errCode !== 0) {
            alert(response.message);
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        let isOpenModal = this.state.isOpenModal;
        let isOpenModalUpdate = this.state.isOpenModalUpdate;
        return (
        <div className='users-container'>
            <ModalUser 
            isOpenModal={isOpenModal} 
            handleToggle={this.handleToggle}
            createUser={this.createUser}
            />
            <ModalUserUpdate
            isOpenModalUpdate={isOpenModalUpdate} 
            handleToggleUpdate={this.handleToggleUpdate}
            currentUser={this.state.userEdit}
            updateUser={this.updateUser}
            />
            <div className='title text-center'>Manage users</div>
            <button className='btn-add-user' onClick={() => {this.handleAddNewUser()}}><i className="fas fa-plus me-2"></i>Add new user</button>
            <div className='users-table mt-3 mx-1'>
            <table id="users">
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
                {arrUsers && arrUsers.map((user,index) => {
                    return(
                    <tbody key={user.id || index}>
                        <tr>
                            <td>{user.email}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.address}</td>
                            <td>{user.phonenumber}</td>
                            <td>
                                <button className="btn-edit" onClick={() => this.handleUpdateNewUser(user)}><i className="fas fa-pencil-alt"></i></button>
                                <button className="btn-delete" onClick={() => this.deleteUser(user.id)}><i className="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
                    )
                })}
            </table>
            </div>
         </div>
        )
    } 

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
