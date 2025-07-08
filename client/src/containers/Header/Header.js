import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu,doctorMenu } from './menuApp';
import './Header.scss';
import {LANGUAGE, USER_ROLE} from '../../utils';
import { FormattedMessage } from 'react-intl';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
           menuApp:[]
        }
    }

    handleChangeLanguage = (language) => {
      this.props.ChangeLanguageApp(language);
    }

    componentDidMount(){
      let {userInfo} = this.props;
      let menu = [];
      if(userInfo) {
        let role = userInfo.roleID;
        if(role === USER_ROLE.ADMIN) {
           menu = adminMenu
        }
        if(role === USER_ROLE.DOCTOR) {
           menu = doctorMenu
        }
      }

      this.setState({
        menuApp: menu
      })
    }

    render() {
        const { processLogout,userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                
                <div className='header-language'>
                    <div className='header-text'><span><FormattedMessage id="homeheader.welcome"/> {userInfo?.firstName || 'Admin'} !</span></div>
                    <div className={this.props.language === 'vi' ? "language-vi active" : "language-vi" }><span onClick={() => this.handleChangeLanguage(LANGUAGE.VI)}>VN</span></div>
                    <div className={this.props.language === 'en' ? "language-en active" : "language-en" }><span onClick={() => this.handleChangeLanguage(LANGUAGE.EN)}>EN</span></div>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Log Out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo : state.user.userInfo   
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        ChangeLanguageApp: ((language) => dispatch(actions.changeLanguage(language)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
