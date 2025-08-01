import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLoginApi } from "../../services/userService";

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
           username:event.target.value
        })
    }

    handleOnChangePassWord = (event) => {
        this.setState({
           password:event.target.value
        })
    }

     handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            this.handleLogin()
        }
    }

    handleShowHide = () => {
        this.setState({
          isShowHidden: !this.state.isShowHidden
        })
    }

    handleLogin = async () => {
        this.setState(
            {
                errMessage: ''
            }
        )
        try {
           let data = await handleLoginApi(this.state.username,this.state.password);
           if(data && data.errCode !==0) {
            this.setState(
            {
                errMessage: data.message
            }
            )}
            if(data && data.errCode ===0) {
               this.props.userLoginSuccess(data.dataUser.user)
            }
           }
        catch (error) {
           if(error.response) {
            if(error.response.data) {
                this.setState (
                    {
                        errMessage: error.response.data.message
                    }
                )
            }
           }
        }
    }

    render() {
        return (
           <div className="login-background">
             <div className="login-container">
                 <div className="login-content row">
                    <div className="col-12 text-login">
                       Login
                    </div>
                    <div className="col-12 form-group login-input">
                        <label>Username:</label>
                        <input type="text" className="form-control" placeholder="Enter your username" 
                         value={this.state.username} 
                         onChange={(event) => this.handleOnChangeUserName(event) } />
                    </div>
                    
                    <div className="col-12 form-group login-input">
                        <label>Password:</label>
                        <div className="custom-input-password">
                            <input type={this.state.isShowHidden ? "text" : "password" }
                            className="form-control"  
                            placeholder="Enter your password"
                            value={this.state.password}
                            onChange={(event) => this.handleOnChangePassWord(event)}
                            onKeyDown={(event) => this.handleKeyDown(event)}
                            /> 
                           <i className={this.state.isShowHidden ? "far fa-eye" : "far fa-eye-slash" }
                              onClick={() => (this.handleShowHide())}></i> 
                        </div>
                    </div>
                    <div className="col-12" style={{ color : 'red'}}>
                        {this.state.errMessage}
                    </div>
                    <div className="col-12">
                         <button className="btn-button" onClick={() => this.handleLogin() }>Login</button>
                    </div>
                    <div className="col-12">
                        <span className="forgot-password">Forgot your password ?</span>
                    </div>
                    <div className="col-12 text-center mt-3">
                        <span className="text-other-login">Or Loggin with:</span>
                    </div>
                    <div className="col-12 social-login">
                        <i className="fab fa-google-plus-g google"></i>  
                        <i className="fab fa-facebook-f facebook" ></i>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
