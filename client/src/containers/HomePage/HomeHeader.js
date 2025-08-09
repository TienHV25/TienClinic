import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/Logo.png';
import { FormattedMessage } from 'react-intl';
import {LANGUAGE} from '../../utils';
import {changeLanguage} from '../../store/actions';
import { withRouter } from 'react-router-dom';
import * as actions from "../../store/actions";
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { push } from "connected-react-router";

class HomeHeader extends Component {
   constructor(props) {
    super(props);
      this.state = {
        show:false
      };
   }

   ChangeLanguage = (language) => {
      this.props.ChangeLanguageApp(language);
   };

   returnHome = () => {
     if (this.props.history) {
         this.props.history.push(`/home`);
      }
   };

   handleLogin = () => {
     if (this.props.history) {
         this.props.history.push(`/login`);
      }
   };

   popoverUser = () => (
      <Popover id="popover-basic" className="header-popover">
         <Popover.Body>
            <div className="popover-item" onClick={this.props.processLogout}>
            <i className="fas fa-sign-out-alt"></i> Đăng xuất
            </div>
         </Popover.Body>
      </Popover>
   );

   popoverAdmin = () => (
      <Popover id="popover-basic" className="header-popover">
         <Popover.Body>
            <div className="popover-item" onClick={this.props.processLogout}>
            <i className="fas fa-sign-out-alt"></i> Đăng xuất
            </div>
            <div className="popover-item" onClick={() => this.props.navigate('/system')}>
            <i className="fas fa-cog"></i> Quản lý hệ thống
            </div>
         </Popover.Body>
      </Popover>
   );

   render() {
        let {userInfo} = this.props;
        let {show} = this.state;
        return (
         <React.Fragment>
           <div className='home-header-container'>
             <div className='home-header-content'>
                <div className='left-content'>
                    <img src={logo} alt="TienClinic Logo" className='header-logo' onClick={this.returnHome} />
                </div>
                <div className='center-content'>
                    <div className='content-child'>
                       <div><b><FormattedMessage id="homeheader.speciality"/></b></div>
                       <div className='sub-title'><FormattedMessage id="homeheader.searchdoctor"/></div>
                    </div>
                    <div className='content-child'>
                       <div><b><FormattedMessage id="homeheader.healthfacility"/></b></div>
                       <div className='sub-title'><FormattedMessage id="homeheader.selectclinic"/></div>
                    </div>
                    <div className='content-child'>
                       <div><b><FormattedMessage id="homeheader.doctor"/></b></div>
                       <div className='sub-title'><FormattedMessage id="homeheader.selectdoctor"/></div>
                    </div>
                    <div className='content-child'>
                       <div><b><FormattedMessage id="homeheader.fee"/></b></div>
                       <div className='sub-title'><FormattedMessage id="homeheader.checkhealth"/></div>
                    </div>
                </div>
                <div className='right-content'>
                       {userInfo ? 
                        (userInfo.roleID === 'R1' ? (
                              <OverlayTrigger
                                 trigger="click"
                                 placement="bottom"
                                 overlay={this.popoverAdmin()}
                                 show={show}
                                 onToggle={() => this.setState({ show: !show })}
                              >
                                 <div className='text-welcome'>
                                 <span><FormattedMessage id="homeheader.welcome" /> {userInfo?.firstName} !</span>
                                 <i className="fas fa-sort-down"></i>
                                 </div>
                              </OverlayTrigger>
                           ) : (
                              <OverlayTrigger
                                 trigger="click"
                                 placement="bottom"
                                 overlay={this.popoverUser()}
                                 show={show}
                                 onToggle={() => this.setState({ show: !show })}
                              >
                                 <div className='text-welcome'>
                                 <span><FormattedMessage id="homeheader.welcome" /> {userInfo?.firstName} !</span>
                                 <i className="fas fa-sort-down"></i>
                                 </div>
                              </OverlayTrigger>
                           ))
                           : (
                           <div className='login' onClick={this.handleLogin}>
                              <i className="fas fa-sign-in-alt"></i>
                              <FormattedMessage id="homeheader.login" />
                           </div>
                        )}
                        <div className='flag'>
                           <div className={this.props.language === 'vi' ? 'language-vi active' : 'language-vi'}><span onClick={() => this.ChangeLanguage(LANGUAGE.VI)}>VN</span></div>
                           <div className={this.props.language === 'en' ? 'language-en active' : 'language-en'}><span onClick={() => this.ChangeLanguage(LANGUAGE.EN)}>EN</span></div>
                        </div>
                </div>
             </div>
           </div>
           {this.props.isShowBanner && 
           <div className='home-header-banner'>
             <div className='content-up'>
                <div className='title'><FormattedMessage id="banner.healthcareplatform"/></div>
                <div className='sub-title'><FormattedMessage id="banner.comprehensive"/></div>
                <div className='search'>
                  <i className='fas fa-search'></i>
                  <input type='text' placeholder='Tìm chuyên khoa khám bệnh'/>
                </div>
             </div>
             <div className='content-down'>
                <div className='options'>
                  <div className='option-child'>
                     <div className='icon-child'><i className='far fa-hospital'></i></div>
                     <div className='text-child'><FormattedMessage id="banner.specialistconsultation"/></div>
                  </div>
                  <div className='option-child'>
                     <div className='icon-child'><i className='fas fa-mobile-alt'></i></div>
                     <div className='text-child'><FormattedMessage id="banner.telemedicine"/></div>
                  </div>
                  <div className='option-child'>
                     <div className='icon-child'><i className='fas fa-procedures'></i></div>
                     <div className='text-child'><FormattedMessage id="banner.generalcheckup"/></div>
                  </div>
                  <div className='option-child'>
                     <div className='icon-child'><i className="fa-solid fa-microscope"></i></div>
                     <div className='text-child'><FormattedMessage id="banner.medicaltesting"/></div>
                  </div>
                  <div className='option-child'>
                     <div className='icon-child'><i className='fas fa-user-md'></i></div>
                     <div className='text-child'><FormattedMessage id="banner.mentalhealth"/></div>
                  </div>
                  <div className='option-child'>
                     <div className='icon-child'><i className="fa-solid fa-tooth"></i></div>
                     <div className='text-child'><FormattedMessage id="banner.dentalcheckup"/></div>
                  </div>
                </div>
             </div>
           </div>
           }
        </React.Fragment>
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
      navigate: (path) => dispatch(push(path)),
      processLogout: () => dispatch(actions.processLogout()),
      ChangeLanguageApp: ((language) => dispatch(changeLanguage(language)))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
