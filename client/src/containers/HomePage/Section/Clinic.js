import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Section.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {LANGUAGE} from '../../../utils';
import {changeLanguage} from '../../../store/actions';
import ChoRay_hospital from "../../../assets/clinic/ChoRay-hospital.jpg";

class Clinic extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        }
        return (
          <div className='section-container'>
            <div className='section-content'>
              <div className='section-header'>
                <h3>Cơ Sở Y Tế</h3>
                <span>Xem Thêm</span>
              </div>
             <Slider {...settings}>
                <div className='img-customize'>
                    <img src={ChoRay_hospital} alt='Clinic' />
                    <h3>Bệnh Viện Chợ Rẫy</h3>
                </div>
                <div className='img-customize'>
                    <img src={ChoRay_hospital} alt='Clinic' />
                    <h3>Bệnh Viện Chợ Rẫy</h3>
                </div>
                <div className='img-customize'>
                    <img src={ChoRay_hospital} alt='Clinic' />
                    <h3>Bệnh Viện Chợ Rẫy</h3>
                </div>
                <div className='img-customize'>
                    <img src={ChoRay_hospital} alt='Clinic' />
                    <h3>Bệnh Viện Chợ Rẫy</h3>
                </div>
                <div className='img-customize'>
                    <img src={ChoRay_hospital} alt='Clinic' />
                    <h3>Bệnh Viện Chợ Rẫy</h3>
                </div>
                <div className='img-customize'>
                    <img src={ChoRay_hospital} alt='Clinic' />
                    <h3>Bệnh Viện Chợ Rẫy</h3>
                </div>
                <div className='img-customize'>
                    <img src={ChoRay_hospital} alt='Clinic' />
                    <h3>Bệnh Viện Chợ Rẫy</h3>
                </div>
                <div className='img-customize'>
                    <img src={ChoRay_hospital} alt='Clinic' />
                    <h3>Bệnh Viện Chợ Rẫy</h3>
                </div>
                <div className='img-customize'>
                    <img src={ChoRay_hospital} alt='Clinic' />
                    <h3>Bệnh Viện Chợ Rẫy</h3>
                </div>
                <div className='img-customize'>
                    <img src={ChoRay_hospital} alt='Clinic' />
                    <h3>Bệnh Viện Chợ Rẫy</h3>
                </div>
                 <div className='img-customize'>
                    <img src={ChoRay_hospital} alt='Clinic' />
                    <h3>Bệnh Viện Chợ Rẫy</h3>
                </div>
                <div className='img-customize'>
                    <img src={ChoRay_hospital} alt='Clinic' />
                    <h3>Bệnh Viện Chợ Rẫy</h3>
                </div>
              </Slider>
             </div>
          </div>
        )
    }

}

const mapStateToProps = state => {
    return { 
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Clinic);
