import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import DoctorManage from '../containers/System/DoctorManage';
import UserManageRedux from '../containers/System//Admin/UserManageRedux';
import Header from '../containers/Header/Header';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
import ManageHanbook from '../containers/System/Handbook/ManageHanbook'
import ManageHanbookTests from '../containers/System/Handbook/ManageHanbookTests';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
        <React.Fragment>
            {this.props.isLoggedIn && <Header />}
            <div className="system-container">
                <div className="system-list"> 
                    <Switch>
                        <Route path="/system/user-manage-redux" component={UserManageRedux} />
                        <Route path="/system/doctor-manage" component={DoctorManage} />
                        <Route path="/system/specialty-manage" component={ManageSpecialty} />
                        <Route path="/system/clinic-manage" component={ManageClinic} />
                        <Route path="/system/handbook-manage" component={ManageHanbook} />
                        <Route path="/system/handbook-tests" component={ManageHanbookTests} />
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
        </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language 
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
