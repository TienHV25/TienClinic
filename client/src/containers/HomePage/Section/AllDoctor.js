import React, { Component } from 'react';
import { connect } from "react-redux";
import "./AllDoctor.scss";
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { withRouter } from 'react-router-dom';
import { getSpecialtyDoctorById,getSpecialtyDetail } from '../../../services/userService';

const { Buffer } = require('buffer');

class AllDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            specialties: []
        }
    }

    componentDidMount() {
        this.props.fetchDoctorApp(1000);
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.doctors !== this.props.doctors) {
            this.setState({
                doctors: this.props.doctors
            });
        
      let specialties = [];

      for (const doctor of this.props.doctors) {
        let res = await getSpecialtyDoctorById(doctor.id);

        if (res && res.data) {
          for (const s of res.data) {
            let detail = await getSpecialtyDetail(s.specialtyId);

            if (detail && detail.data) {
              specialties.push({
                doctorId: doctor.id,
                specilatyId: detail.data.id,
                specialtyName: detail.data.name 
              });
            }
          }
        }
      }
      this.setState({ specialties });
    }
    }

    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`);
        }
    }

    render() {
        const { doctors,specialties } = this.state;
        const { language } = this.props;

        return (
            <div className="all-doctor-container">
                <div className="breadcrumb">
                    <span onClick={() => this.props.history.push('/')}><FormattedMessage id="homeheader.homepage" /></span> / <FormattedMessage id="doctor.title" />
                </div>

                <h2 className="title"><FormattedMessage id="doctor.title" /></h2>

                <div className="doctor-list">
                {doctors && doctors.length > 0 &&
                    doctors.map((doctor, index) => {
                    
                        let doctorSpecialties = specialties.filter(s => s.doctorId === doctor.id);

                        return (
                            <div
                                className="doctor-item"
                                key={index}
                                onClick={() => this.handleViewDetailDoctor(doctor)}
                            >
                            <div
                                className="doctor-img"
                                style={{ backgroundImage: `url(${doctor.image})` }}
                            ></div>
                            <div className="doctor-info">
                                <h3>
                                    {language === 'vi'
                                        ? doctor.positionData.valueVi
                                        : doctor.positionData.valueEn}{" "}
                                    {doctor.lastName} {doctor.firstName}
                                </h3>

                                {doctorSpecialties.length > 0 ? (
                                    doctorSpecialties.map((specialty, idx) => (
                                        <p
                                            key={idx}
                                            className="specialty"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                this.props.history.push(`/detail-specialty/${specialty.specilatyId}`);
                                            }}
                                        >
                                            {specialty.specialtyName}
                                        </p>
                                    ))
                                ) : (
                                    <p className="specialty">Đang cập nhật</p>
                                )}
                            </div>
                        </div>
                        );
                    })
                }
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctors: state.admin.doctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorApp: (limit) => dispatch(actions.fetchDoctorStart(limit))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllDoctor));
