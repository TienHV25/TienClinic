import React, { Component } from 'react';
import { connect } from 'react-redux';
class UserManageRedux extends Component {

    state = {

    }

    componentDidMount() {
    }


    render() {
        return (
            <div className='users-redux-container'>
               <div className='users-redux-content'>
                  <div className='title text-center'>Manage users redux</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManageRedux);
