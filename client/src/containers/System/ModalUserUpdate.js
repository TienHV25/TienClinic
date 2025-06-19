import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalUserUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
    if (
        !prevProps.isOpenModalUpdate &&
        this.props.isOpenModalUpdate &&
        this.props.currentUser
    ) {
        this.setState({
            id: this.props.currentUser.id,
            email: this.props.currentUser.email,
            password: this.props.currentUser.password,
            firstName: this.props.currentUser.firstName,
            lastName: this.props.currentUser.lastName,
            address: this.props.currentUser.address
        });
    }
    }    

    toggle() {
       this.props.handleToggleUpdate();
    }

    handleInputUser = (event) => {
        let {id,value} = event.target;
        this.setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    checkValidate = () => {
        let isValid = true;
        const arr = ['email','firstName','lastName','address'];
        for(let i = 0; i < arr.length; i++){
            if(!this.state[arr[i]]){
                isValid = false;
                alert(`Missing parameter input for ${arr[i]}`);
                break;
            }
        }
        return isValid;
    }

    EditUser = (data) => {
      let checkIsValid = this.checkValidate();
      if(checkIsValid) {
        this.props.updateUser(data)
      }

    }

    render() {
        return (
        <Modal className='modal-lg' isOpen= {this.props.isOpenModalUpdate} toggle={() => {this.toggle()}} >
            <ModalHeader><span>User information</span>
                <button
                onClick={() => {this.toggle()}}
                style={{
                    position: 'absolute',
                    bottom: '250x',
                    left: '770px',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    color:'white'
                }}
                aria-label="Close"
                >
                ×
                </button></ModalHeader>
            <ModalBody>
            <div className='container'>
               <div className='row  py-2'>
                    <div className='col-6'>
                        <label>Email:</label>
                        <input id = 'email' type='text' className='form-control' value={this.state.email} onChange={this.handleInputUser} disabled/>
                    </div>
                    <div className='col-6'>
                        <label>Password:</label>
                        <input id = 'password' type='password' className='form-control' value={this.state.password} onChange={this.handleInputUser} disabled/>
                    </div>
               </div>
               <div className='row py-2'>
                    <div className='col-6'>
                        <label>First Name:</label>
                        <input id = 'firstName' type='text' className='form-control' value={this.state.firstName} onChange={this.handleInputUser}/>
                    </div>
                    <div className='col-6'>
                        <label>Last Name:</label>
                        <input id = 'lastName' type='text' className='form-control' value={this.state.lastName} onChange={this.handleInputUser}/>
                    </div>
               </div>
               <div className='row py-2'>
                    <div className='col-12'>
                        <label>Address:</label>
                        <input id = 'address' type='text' className='form-control' value={this.state.address} onChange={this.handleInputUser}/>
                    </div>
               </div>
            </div>
            </ModalBody>
            <ModalFooter>
            <Button className='px-3' color="primary" onClick={() => {this.EditUser(this.state)}}>
                Save changes
            </Button>{' '}
            <Button className='px-3' color="secondary" onClick={() => {this.toggle()}}>
                Cancel
            </Button>
            </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUserUpdate);
