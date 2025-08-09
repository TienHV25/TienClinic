import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./SignUp.scss";
import { handleRegisterApi } from "../../services/userService";
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { injectIntl } from 'react-intl';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            isShowPassword: false,
            isShowConfirmPassword: false,
            errMessage: ''
        }
    }

    handleOnChange = (event, field) => {
        this.setState({
            [field]: event.target.value
        });
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        });
    }

    handleShowHideConfirmPassword = () => {
        this.setState({
            isShowConfirmPassword: !this.state.isShowConfirmPassword
        });
    }

    handleSignUp = async () => {
        this.setState({ errMessage: '' });

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ errMessage: 'Mật khẩu nhập lại không khớp' });
            return;
        }

        try {
            let data = await handleRegisterApi({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            });

            if (data && data.errCode !== 0) {
                this.setState({ errMessage: data.message });
            }
            if (data && data.errCode === 0) {
                toast.success(<FormattedMessage id="homeheader.signupSuccess" />);
                this.props.navigate("/login");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                this.setState({ errMessage: error.response.data.message });
            }
        }
    }

    render() {
        let {language} = this.props;
        return (
            <div className="signup-background">
                <div className="signup-container">
                    <div className="signup-content row">
                        <div className="col-12 text-signup">
                            <FormattedMessage id="homeheader.signup" />
                        </div>
                        
                        {language === 'en' ?
                        <>
                            <div className="col-12 form-group signup-input">
                                <label><FormattedMessage id="homeheader.firstname" /></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={this.props.intl.formatMessage({ id: "homeheader.enterFirstname" })}
                                    value={this.state.firstName}
                                    onChange={(e) => this.handleOnChange(e, 'firstName')}
                                />
                            </div>

                            <div className="col-12 form-group signup-input">
                                <label><FormattedMessage id="homeheader.lastname" /></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={this.props.intl.formatMessage({ id: "homeheader.enterLastname" })}
                                    value={this.state.lastName}
                                    onChange={(e) => this.handleOnChange(e, 'lastName')}
                                />
                            </div>
                        </>
                        : 
                        <>  
                            <div className="col-12 form-group signup-input">
                                <label><FormattedMessage id="homeheader.lastname" /></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={this.props.intl.formatMessage({ id: "homeheader.enterLastname" })}
                                    value={this.state.lastName}
                                    onChange={(e) => this.handleOnChange(e, 'lastName')}
                                />
                            </div>

                            <div className="col-12 form-group signup-input">
                                <label><FormattedMessage id="homeheader.firstname" /></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={this.props.intl.formatMessage({ id: "homeheader.enterFirstname" })}
                                    value={this.state.firstName}
                                    onChange={(e) => this.handleOnChange(e, 'firstName')}
                                />
                            </div>
                        </>
                        }

                        <div className="col-12 form-group signup-input">
                            <label><FormattedMessage id="homeheader.email" /></label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder={this.props.intl.formatMessage({ id: "homeheader.enterEmail" })}
                                value={this.state.email}
                                onChange={(e) => this.handleOnChange(e, 'email')}
                            />
                        </div>

                       
                        <div className="col-12 form-group signup-input">
                            <label><FormattedMessage id="homeheader.password" /></label>
                            <div className="custom-input-password">
                                <input
                                    type={this.state.isShowPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder={this.props.intl.formatMessage({ id: "homeheader.enterPassword" })}
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnChange(e, 'password')}
                                />
                                <i
                                    className={this.state.isShowPassword ? "far fa-eye" : "far fa-eye-slash"}
                                    onClick={this.handleShowHidePassword}
                                ></i>
                            </div>
                        </div>

                       
                        <div className="col-12 form-group signup-input">
                            <label><FormattedMessage id="homeheader.confirmPassword" /></label>
                            <div className="custom-input-password">
                                <input
                                    type={this.state.isShowConfirmPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder={this.props.intl.formatMessage({ id: "homeheader.enterConfirmPassword" })}
                                    value={this.state.confirmPassword}
                                    onChange={(e) => this.handleOnChange(e, 'confirmPassword')}
                                />
                                <i
                                    className={this.state.isShowConfirmPassword ? "far fa-eye" : "far fa-eye-slash"}
                                    onClick={this.handleShowHideConfirmPassword}
                                ></i>
                            </div>
                        </div>

                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>

                        <div className="col-12">
                            <button className="btn-button" onClick={this.handleSignUp}>
                                <FormattedMessage id="homeheader.signup" />
                            </button>
                        </div>

                        <div style={{ display: 'flex', marginTop: '20px', marginLeft: '100px', textAlign: 'center', fontSize: '14px', justifyContent: 'center' }}>
                            <div style={{ color: 'rgb(120, 120, 120)' }}>
                                <FormattedMessage id="homeheader.alreadyAccount" />
                            </div>
                            <div
                                onClick={() => this.props.navigate('/login')}
                                style={{ color: 'rgb(13, 92, 182)', cursor: 'pointer', marginLeft: '5px' }}
                            >
                                <FormattedMessage id="homeheader.login" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SignUp));
