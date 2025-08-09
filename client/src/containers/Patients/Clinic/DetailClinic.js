import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DetailClinic.scss";
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import {getClinicDetail,geocodeAddress,getDoctorOfClinic} from '../../../services/userService';
import ClinicMap from './Map';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtralnfor from '../Doctor/DoctorExtralnfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { withRouter } from 'react-router-dom';
import * as actions from "../../../store/actions";

class Detailclinic extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
           doctors: [],
           showInfoMap: {},
           clinic:{},
           lat: null,
           lng: null,
        }
    }
    
    fetchclinicOfDoctor = async (clinicId) => {
        let res = await getDoctorOfClinic(clinicId);
        this.setState({
            doctors:res.data
        })   
    };

    fetchclinicOfDetail = async (id) => {
        let res = await getClinicDetail(id);
        this.setState({
            clinic:res.data
        })   
        if(res.data.address){
            this.fetchLatLng(res.data.address);
        }
    };

    fetchLatLng = async (address) => {
        try {
            let res = await geocodeAddress(address);
            
            if(res && res.errCode === 0 && res.data){
                this.setState({
                    lat: res.data.lat,
                    lng: res.data.lng
                });
            }
        } catch (error) {
            console.error("Lỗi lấy tọa độ: ", error);
        }
    };

    componentDidMount() {
        this.fetchclinicOfDoctor(this.props.match.params.id);
        this.fetchclinicOfDetail(this.props.match.params.id);
    };

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.fetchclinicOfDoctor(this.props.match.params.id);
            this.fetchclinicOfDetail(this.props.match.params.id);
        }
    };

    scrollToSection = (id) => {
        const element = document.getElementById(id);
        if(element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }

    handleShowInfoDoctor = (doctorId, isShowed) => {
        this.setState((prevState) => ({
            showInfoMap: {
            ...prevState.showInfoMap,
            [doctorId]: isShowed
            }
        }));
    }

    navigateToDetailDoctor = (doctorId) => {
     if (this.props.history) {
         this.props.history.push(`/detail-doctor/${doctorId}`);
      }
    };

    handleBookingAppointment = () => {
        this.scrollToSection("doctor-section");
    };

    render() {
        let {doctors,clinic,lat,lng} = this.state;
        return (
          <>
            <HomeHeader />
            <div className='detail-clinic-container'>
                <div className="clinic-banner">
                        <img
                            src={clinic.image}
                            alt="clinic logo"
                            className="clinic-logo"
                        />
                   
                        <div className="clinic-text">
                            <h1>{clinic.name}</h1>
                            <p>{clinic.address}</p>
                        </div>

                        <div className="clinic-menu">
                             <span onClick={() => this.scrollToSection("info-section")}>Thông tin</span>
                             <span onClick={() => this.scrollToSection("map-section")}>Vị trí</span>
                             <span onClick={() => this.scrollToSection("doctor-section")}>Đặt lịch</span>
                        </div>
                </div>
                <div className='detail-clinic-infor' id="info-section">
                   <div dangerouslySetInnerHTML={{__html:  clinic.descriptionHTML}}>
                    </div>
                </div>
                <div className='detail-clinic-map' id="map-section">
                  <span>Vị Trí</span>
                  <div className='map'>{lat && lng && <ClinicMap lat={lat} lng={lng} />}</div>
                </div>
                <div className='detail-clinic-doctor-content' id="doctor-section">
                    {doctors.map((item, index) => (
                        <div className='detail-clinic-doctor' key={item?.doctorId}>
                            <div className='detail-clinic-doctor-left'>
                                <ProfileDoctor
                                    doctorId={item?.doctorId}
                                    isShowDescriptionDoctor={this.state.showInfoMap[item?.doctorId] || false}
                                    handleShowInfoDoctor={(isShowed) =>
                                        this.handleShowInfoDoctor(item?.doctorId, isShowed)
                                    }
                                />
                                <div className='detail-doctor' onClick={() => this.navigateToDetailDoctor(item?.doctorId)}>
                                    <span>Xem chi tiết bác sĩ</span>
                                </div>
                            </div>
                            <div className='detail-clinic-doctor-right'>
                                <div className='detail-clinic-doctor-right-up'>
                                    <DoctorSchedule doctorID={item?.doctorId} />
                                </div>
                                <div className='detail-clinic-doctor-right-down'>
                                    <DoctorExtralnfor doctorID={item?.doctorId} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="sticky-footer-button">
                    <button 
                        className="booking-button"
                        onClick={this.handleBookingAppointment}
                    >
                        Đặt lịch khám
                    </button>
                </div>

            </div>
          </>
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
       
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detailclinic));
