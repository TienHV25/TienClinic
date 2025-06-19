import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Doctor.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {LANGUAGE} from '../../../utils';
import {changeLanguage} from '../../../store/actions';
import doctor from "../../../assets/doctor/doctor.jpg";

class Doctor extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        }
        return (
          <div className='doctor-container'>
            <div className='doctor-content'>
              <div className='doctor-header'>
                <h3>Bác sĩ nổi bật</h3>
                <span>Xem Thêm</span>
              </div>
             <Slider {...settings}>
                <div className='img-customize'>
                    <img src={doctor} alt='Doctor' />
                    <h3>Bác sĩ chuyên khoa II Lê Hồng Anh</h3>
                    <span>Thần kinh</span>
                </div>
                <div className='img-customize'>
                    <img src={doctor} alt='Doctor' />
                    <h3>Bác sĩ chuyên khoa II Lê Hồng Anh</h3>
                    <span>Thần kinh</span>
                </div>
                <div className='img-customize'>
                    <img src={doctor} alt='Doctor' />
                    <h3>Bác sĩ chuyên khoa II Lê Hồng Anh</h3>
                    <span>Thần kinh</span>
                </div>
                <div className='img-customize'>
                    <img src={doctor} alt='Doctor' />
                    <h3>Bác sĩ chuyên khoa II Lê Hồng Anh</h3>
                    <span>Thần kinh</span>
                </div>
                <div className='img-customize'>
                    <img src={doctor} alt='Doctor' />
                    <h3>Bác sĩ chuyên khoa II Lê Hồng Anh</h3>
                    <span>Thần kinh</span>
                </div>
                <div className='img-customize'>
                    <img src={doctor} alt='Doctor' />
                    <h3>Bác sĩ chuyên khoa II Lê Hồng Anh</h3>
                    <span>Thần kinh</span>
                </div>
                <div className='img-customize'>
                    <img src={doctor} alt='Doctor' />
                    <h3>Bác sĩ chuyên khoa II Lê Hồng Anh</h3>
                    <span>Thần kinh</span>
                </div>
                <div className='img-customize'>
                    <img src={doctor} alt='Doctor' />
                    <h3>Bác sĩ chuyên khoa II Lê Hồng Anh</h3>
                    <span>Thần kinh</span>
                </div>
                <div className='img-customize'>
                    <img src={doctor} alt='Doctor' />
                    <h3>Bác sĩ chuyên khoa II Lê Hồng Anh</h3>
                    <span>Thần kinh</span>
                </div>
                <div className='img-customize'>
                    <img src={doctor} alt='Doctor' />
                    <h3>Bác sĩ chuyên khoa II Lê Hồng Anh</h3>
                    <span>Thần kinh</span>
                </div>
                 <div className='img-customize'>
                    <img src={doctor} alt='Doctor' />
                    <h3>Bác sĩ chuyên khoa II Lê Hồng Anh</h3>
                    <span>Thần kinh</span>
                </div>
                <div className='img-customize'>
                    <img src={doctor} alt='Doctor' />
                    <h3>Bác sĩ chuyên khoa II Lê Hồng Anh</h3>
                    <span>Thần kinh</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
