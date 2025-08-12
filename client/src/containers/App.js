import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CustomScrollbars from '../components/CustomScrollbars';
import DetailDoctor from './Patients/Doctor/DetailDoctor.js';
import Doctor from '../routes/Doctor.js';
import VerifyEmail from './Patients/VerifyEmail.js';

import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
//import Login from '../routes/Login';
import Login from './Auth/Login';
import System from '../routes/System';
import HomePage from './HomePage/HomePage';
import DetailSpecialty from './Patients/Specialty/DetailSpecialty.js';
import DetailClinic from './Patients/Clinic/DetailClinic.js';
import SignUp from './Auth/SignUp.js';
import AllDoctor from './HomePage/Section/AllDoctor.js';
import AllSpecialty from './HomePage/Section/AllSpecialty.js';
import AllClinic from './HomePage/Section/AllClinic.js';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                         <CustomScrollbars style={{height:'100vh'}}>
                            <Switch>
                                <Route path={path.HOME} exact component={(Home)} />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.SIGNUP} component={userIsNotAuthenticated(SignUp)} />
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />
                                <Route path={path.HOMEPAGE} component={(HomePage)} />
                                <Route path={path.DETAIL_DOCTOR} component={(DetailDoctor)} />
                                <Route path={path.DETAIL_SPECIALTY} component={(DetailSpecialty)} />
                                <Route path={path.DETAIL_CLINIC} component={(DetailClinic)} />
                                <Route path={path.VERIFY_EMIAL_BOOKING} component={(VerifyEmail)} />
                                <Route path={path.ALL_DOCTOR} component={AllDoctor} />
                                <Route path={path.ALL_SPECIALTY} component={AllSpecialty} />
                                <Route path={path.ALL_CLINIC} component={AllClinic} />
                            </Switch>
                         </CustomScrollbars>
                        </div>
                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick={false}
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);