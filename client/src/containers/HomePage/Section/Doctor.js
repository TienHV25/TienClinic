import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Doctor.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions'


const SampleNextArrow = (props) => {
  const { onClick, currentSlide, slideCount } = props;
  const hidden = currentSlide >= slideCount - 4;
  return !hidden ? (
    <div className="custom-arrow next" onClick={onClick}>
      ►
    </div>
  ) : null;
};


const SamplePrevArrow = (props) => {
  const { onClick, currentSlide } = props;
  const hidden = currentSlide === 0;
  return !hidden ? (
    <div className="custom-arrow prev" onClick={onClick}>
      ◄
    </div>
  ) : null;
};

class Doctor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
           doctors: []
        };
    };

    componentDidMount() {
       this.props.fetchDoctorApp()
    };

    componentDidUpdate(prevProps) {
        if(prevProps.doctors !== this.props.doctors) {
            this.setState({
                doctors: this.props.doctors
            })
        }
    };

    render() {
        let doctors = this.state.doctors;
        let settings = {
            dots: false,
            infinite: doctors.length > 4,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        }
        return (
          <div className='doctor-container'>
            <div className='doctor-content'>
              <div className='doctor-header'>
                <h3><FormattedMessage id="doctor.title"/></h3>
                <span><FormattedMessage id="doctor.viewmore"/></span>
              </div>
              <Slider {...settings}>
              {doctors.length > 0 && doctors.map((item,index) => {
                 let imageBase64 = '';
                 if(item.image) {
                  imageBase64 = new Buffer(item.image,'base64').toString('binary');
                 }
                 return (
                    <div className='img-customize' key={index}>
                        {/* <img src={doctor} alt='Doctor' /> */}
                        <div className='img-doctor' style={{backgroundImage: `url(${imageBase64})`}}></div>
                        <h3>{this.props.language === 'vi' ? item.positionData.valueVi : item.positionData.valueEn}  {item.lastName} {item.firstName} </h3>
                        <span>Thần kinh</span>
                    </div>
                 )
              })}
               </Slider>
             </div>
          </div>
        )
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
      fetchDoctorApp: (() => dispatch(actions.fetchDoctorStart()))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
