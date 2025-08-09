import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Doctor.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import { getSpecialtyDoctorById,getSpecialtyDetail } from '../../../services/userService';
const { Buffer } = require('buffer');

const SampleNextArrow = (props) => {
  const { onClick, currentSlide, slideCount } = props;
  const hidden = currentSlide >= slideCount - 4;
  return !hidden ? (
    <div className="custom-arrow next" onClick={onClick}>►</div>
  ) : null;
};

const SamplePrevArrow = (props) => {
  const { onClick, currentSlide } = props;
  const hidden = currentSlide === 0;
  return !hidden ? (
    <div className="custom-arrow prev" onClick={onClick}>◄</div>
  ) : null;
};

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
      specialties: []
    };
  }

  componentDidMount() {
    this.props.fetchDoctorApp();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.doctors !== this.props.doctors) {
      this.setState({ doctors: this.props.doctors });

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

  handleViewDetailDoctor = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${item.id}`);
    }
  };

  handleViewDetailSpecialty = (id) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${id}`);
    }
  };

  render() {
    console.log(this.state.specialties)
    let { doctors, specialties } = this.state;
    let settings = {
      dots: false,
      infinite: doctors.length > 4,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };

    return (
      <div className='doctor-container'>
        <div className='doctor-content'>
          <div className='doctor-header'>
            <h3><FormattedMessage id="doctor.title" /></h3>
            <span><FormattedMessage id="doctor.viewmore" /></span>
          </div>

          <Slider {...settings}>
            {doctors.length > 0 && doctors.map((doctor, index) => {
              let imageBase64 = '';
              if (doctor.image) {
                imageBase64 = Buffer.from(doctor.image, 'base64').toString('binary');
              }

              let doctorSpecialties = specialties.filter(s => s.doctorId === doctor.id);

              return (
                <div
                  className='img-customize'
                  key={index}
                >
                  <div
                    className='img-doctor'
                    style={{ backgroundImage: `url(${imageBase64})` }}
                    onClick={() => this.handleViewDetailDoctor(doctor)}
                  ></div>

                  <h3 onClick={() => this.handleViewDetailDoctor(doctor)}>
                    {this.props.language === 'vi'
                      ? doctor.positionData.valueVi
                      : doctor.positionData.valueEn}{" "}
                    {doctor.lastName} {doctor.firstName}
                  </h3>

                  {doctorSpecialties.length > 0 &&
                    doctorSpecialties.map((specialty, index) => (
                      <span  onClick={() => this.handleViewDetailSpecialty(specialty?.specilatyId)} 
                        key={index}>{specialty.specialtyName}
                      </span>
                    ))}
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    doctors: state.admin.doctors,
    language: state.app.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDoctorApp: () => dispatch(actions.fetchDoctorStart())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
