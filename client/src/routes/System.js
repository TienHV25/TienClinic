import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import DoctorManage from '../containers/System/DoctorManage';
import UserManageRedux from '../containers/System//Admin/UserManageRedux';
import Header from '../containers/Header/Header';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
        <React.Fragment>
            {this.props.isLoggedIn && <Header />}
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/user-manage-redux" component={UserManageRedux} />
                        <Route path="/system/doctor-manage" component={DoctorManage} />
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
