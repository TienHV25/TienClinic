import React, { Component } from "react"; 
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLoginApi } from "../../services/userService";
import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '' ,
            password: '',
            isShowHidden: false,
            errMessage: ''
        }
    }

    handleOnChangeUserName = (event) => {
        this.setState({
           username: event.target.value
        });
    }

    handleOnChangePassWord = (event) => {
        this.setState({
           password: event.target.value
        });
    }

    handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            this.handleLogin();
        }
    }

    handleShowHide = () => {
        this.setState({
          isShowHidden: !this.state.isShowHidden
        });
    }

    redirectToSystemPage = () => {
        const { navigate } = this.props;
        const redirectPath = '/home';
        navigate(`${redirectPath}`);
    }

    handleLogin = async () => {
        this.setState({ errMessage: '' });
        try {
           let data = await handleLoginApi(this.state.username,this.state.password);
           if(data && data.errCode !== 0) {
                this.setState({ errMessage: data.message });
            }
            if(data && data.errCode === 0) {
               this.props.userLoginSuccess(data.dataUser.user);
               this.redirectToSystemPage();
            }
        }
        catch (error) {
           if(error.response && error.response.data) {
                this.setState({ errMessage: error.response.data.message });
           }
        }
    }

    render() {
        return (
           <div className="login-background">
             <div className="login-container">
                 <div className="login-content row">
                    <div className="col-12 text-login">
                       <FormattedMessage id="homeheader.login" />
                    </div>

                    <div className="col-12 form-group login-input">
                        <label><FormattedMessage id="homeheader.email" /></label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder={this.props.intl.formatMessage({ id: "homeheader.enterEmail" })}
                            value={this.state.username} 
                            onChange={(event) => this.handleOnChangeUserName(event) } 
                        />
                    </div>
                    
                    <div className="col-12 form-group login-input">
                        <label><FormattedMessage id="homeheader.password" /></label>
                        <div className="custom-input-password">
                            <input 
                                type={this.state.isShowHidden ? "text" : "password" }
                                className="form-control"  
                                placeholder={this.props.intl.formatMessage({ id: "homeheader.enterPassword" })}
                                value={this.state.password}
                                onChange={(event) => this.handleOnChangePassWord(event)}
                                onKeyDown={(event) => this.handleKeyDown(event)}
                            /> 
                            <i 
                                className={this.state.isShowHidden ? "far fa-eye" : "far fa-eye-slash" }
                                onClick={() => this.handleShowHide()}
                            ></i> 
                        </div>
                    </div>

                    <div className="col-12" style={{ color : 'red'}}>
                        {this.state.errMessage}
                    </div>

                    <div className="col-12">
                         <button className="btn-button" onClick={() => this.handleLogin()}>
                            <FormattedMessage id="homeheader.login" />
                         </button>
                    </div>

                    <div className="col-12">
                        <span className="forgot-password">
                            <FormattedMessage id="homeheader.forgetpass" />
                        </span>
                    </div>

                    <div style={{display:'flex',marginTop:'90px',textAlign:'center',fontSize:'14px',marginLeft:'100px'}}>
                        <div style={{color:'rgb(120, 120, 120)'}}>
                            <FormattedMessage id="homeheader.noaccount" />
                        </div>
                        <div 
                            onClick={() => this.props.navigate('/sign-up')} 
                            style={{color:'rgb(13, 92, 182)',cursor:'pointer',marginLeft:'5px'}}
                        >
                            <FormattedMessage id="homeheader.creccount" />
                        </div>
                    </div>
                 </div>
             </div>
           </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Login));
