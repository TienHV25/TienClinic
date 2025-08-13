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
import { USER_ROLE} from '../../utils';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            placeholderIndex: 0
        };
        this.placeholders = [
            "Tìm kiếm bác sĩ",
            "Tìm kiếm chuyên khoa",
            "Tìm kiếm phòng khám",
            "Tìm kiếm cẩm nang"
        ];
        this.intervalId = null;
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState(prevState => ({
                placeholderIndex: (prevState.placeholderIndex + 1) % this.placeholders.length
            }));
        }, 2000);
    }

    componentWillUnmount() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
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
                    <i className="fas fa-sign-out-alt"></i> <FormattedMessage id="homeheader.logout"/>
                </div>
            </Popover.Body>
        </Popover>
    );

    popoverAdmin = () => (
        <Popover id="popover-basic" className="header-popover">
            <Popover.Body>
                <div className="popover-item" onClick={this.props.processLogout}>
                    <i className="fas fa-sign-out-alt"></i> <FormattedMessage id="homeheader.logout"/>
                </div>
                <div className="popover-item" onClick={() => this.props.navigate('/system')}>
                    <i className="fas fa-cog"></i> <FormattedMessage id="homeheader.manage-system"/>
                </div>
            </Popover.Body>
        </Popover>
    );

    popoverDoctor = () => (
        <Popover id="popover-basic" className="header-popover">
            <Popover.Body>
                <div className="popover-item" onClick={this.props.processLogout}>
                    <i className="fas fa-sign-out-alt"></i> <FormattedMessage id="homeheader.logout"/>
                </div>
                <div className="popover-item" onClick={() => this.props.navigate('/doctor/manage-schedule')}>
                    <i className="fas fa-cog"></i> <FormattedMessage id="homeheader.manage-schedule"/>
                </div>
                <div className="popover-item" onClick={() => this.props.navigate('/doctor/manage-patient')}>
                    <i className="fas fa-cog"></i> <FormattedMessage id="homeheader.manage-patient"/>
                </div>
            </Popover.Body>
        </Popover>
    );

    getPopoverByRole = () => {
        const { userInfo } = this.props;

        switch (userInfo?.roleID) {
            case USER_ROLE.ADMIN:
                return this.popoverAdmin();
            case USER_ROLE.DOCTOR:
                return this.popoverDoctor();
            default:
                return this.popoverUser();
        }
    };

    scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.warn('Không tìm thấy section id=', id);
        }
    };

    render() {
        let { userInfo } = this.props;
        let { show, placeholderIndex } = this.state;

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <img src={logo} alt="TienClinic Logo" className='header-logo' onClick={this.returnHome} />
                        </div>

                        <div className='center-content'>
                            <div className='content-child' onClick={() => this.scrollToSection("Specialty")}>
                                <div><b><FormattedMessage id="homeheader.speciality"/></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.searchdoctor"/></div>
                            </div>
                            <div className='content-child' onClick={() => this.scrollToSection("Clinic")}>
                                <div><b><FormattedMessage id="homeheader.healthfacility"/></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.selectclinic"/></div>
                            </div>
                            <div className='content-child' onClick={() => this.scrollToSection("Doctor")}>
                                <div><b><FormattedMessage id="homeheader.doctor"/></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.selectdoctor"/></div>
                            </div>
                            <div className='content-child' onClick={() => this.scrollToSection("Handlebook")}>
                                <div><b><FormattedMessage id="homeheader.handlebook"/></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.checkhealth"/></div>
                            </div>
                        </div>

                        <div className='right-content'>
                            {userInfo ? (
                                <OverlayTrigger
                                    trigger="click"
                                    placement="bottom"
                                    overlay={this.getPopoverByRole()}
                                    show={show}
                                    onToggle={() => this.setState({ show: !show })}
                                >
                                    <div className='text-welcome'>
                                        <span><FormattedMessage id="homeheader.welcome" /> {userInfo?.firstName} !</span>
                                        <i className="fas fa-sort-down"></i>
                                    </div>
                                </OverlayTrigger>
                            ) : (
                                <div className='login' onClick={this.handleLogin}>
                                    <i className="fas fa-sign-in-alt"></i>
                                    <FormattedMessage id="homeheader.login" />
                                </div>
                            )}

                            <div className='flag'>
                                <div className={this.props.language === 'vi' ? 'language-vi active' : 'language-vi'}>
                                    <span onClick={() => this.ChangeLanguage(LANGUAGE.VI)}>VN</span>
                                </div>
                                <div className={this.props.language === 'en' ? 'language-en active' : 'language-en'}>
                                    <span onClick={() => this.ChangeLanguage(LANGUAGE.EN)}>EN</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.props.isShowBanner &&
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title'><FormattedMessage id="banner.healthcareplatform"/></div>
                        <div className='sub-title'><FormattedMessage id="banner.comprehensive"/></div>
                        <div className='search' onClick={() => this.props.navigate('/search')}>
                            <i className='fas fa-search'></i>
                            <input type='text'  placeholder={this.placeholders[placeholderIndex]} />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child' onClick={() => this.props.navigate('/all-specialty')}>
                                <div className='icon-child'><i className="fas fa-wheelchair"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.specialistconsultation"/></div>
                            </div>
                            <div className='option-child' onClick={() => this.props.navigate('/all-clinic')}>
                                <div className='icon-child'><i className='far fa-hospital'></i></div>
                                <div className='text-child'><FormattedMessage id="banner.facilityconsultation"/></div>
                            </div>
                            <div className='option-child' onClick={() => this.props.navigate('/all-doctor')}>
                                <div className='icon-child'><i className='fas fa-user-md'></i></div>
                                <div className='text-child'><FormattedMessage id="banner.doctorconsultation"/></div>
                            </div>
                            <div className='option-child' onClick={() => this.props.navigate('/all-handbook')}>
                                <div className='icon-child'><i className="fas fa-book-medical"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.medicalhandbook"/></div>
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
