import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/Logo.png';
import { FormattedMessage } from 'react-intl';
import {LANGUAGE} from '../../utils';
import {changeLanguage} from '../../store/actions';
import { withRouter } from 'react-router-dom';

class HomeHeader extends Component {
   ChangeLanguage = (language) => {
      this.props.ChangeLanguageApp(language);
   };

   returnHome = () => {
     if (this.props.history) {
         this.props.history.push(`/home`);
      }
   };

    render() {
        return (
         <React.Fragment>
           <div className='home-header-container'>
             <div className='home-header-content'>
                <div className='left-content'>
                    <i className='fas fa-bars'></i>
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
                        <div className='support'>
                           <i className='fas fa-question-circle'></i>
                           <FormattedMessage id="homeheader.support"/>
                        </div>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
      ChangeLanguageApp: ((language) => dispatch(changeLanguage(language)))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
