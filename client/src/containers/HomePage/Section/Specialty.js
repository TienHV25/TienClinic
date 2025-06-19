import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Section.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Specialty_cardiovascular from "../../../assets/specialty/Specialty-cardiovascular.png";
import Specialty_digest from "../../../assets/specialty/Specialty-digest.png";
import Specialty_ear_nose_throat from "../../../assets/specialty/Specialty-ear-nose-throat.png";
import Specialty_eye_specialist from "../../../assets/specialty/Specialty-eye-specialist.png";
import Specialty_fetal_ultrasound from "../../../assets/specialty/Specialty-fetal-ultrasound.png";
import Specialty_general_dentistry from "../../../assets/specialty/Specialty-general-dentistry.png";
import Specialty_mental_health from "../../../assets/specialty/Specialty-mental-health.png";
import Specialty_musculoskeletal from "../../../assets/specialty/Specialty-musculoskeletal.png";
import Specialty_nerve from "../../../assets/specialty/Specialty-nerve.png";
import Specialty_respiratory_lung from "../../../assets/specialty/Specialty-respiratory-lung.png";
import Specialty_spine from "../../../assets/specialty/Specialty-spine.png";
import Specialty_thyroid from "../../../assets/specialty/Specialty-thyroid.png";
import { FormattedMessage } from 'react-intl';
import {LANGUAGE} from '../../../utils';
import {changeLanguage} from '../../../store/actions';


class Specialty extends Component {
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
                <h3><FormattedMessage id="specialty.specialty"/></h3>
                <span><FormattedMessage id="specialty.viewmore"/></span>
              </div>
             <Slider {...settings}>
                <div className='img-customize'>
                    <img src={Specialty_cardiovascular} alt='Specialty cardiovascular' />
                    <h3><FormattedMessage id="specialty.cardiovascular"/></h3>
                </div>
                <div className='img-customize'>
                    <img src={Specialty_digest} alt='Specialty digest' />
                    <h3><FormattedMessage id="specialty.digest"/></h3>
                </div>
                <div className='img-customize'>
                    <img src={Specialty_ear_nose_throat} alt='Specialty ear nose throat' />
                    <h3><FormattedMessage id="specialty.ear_nose_throat"/></h3>
                </div>
                <div className='img-customize'>
                    <img src={Specialty_eye_specialist} alt='Specialty eye specialist' />
                    <h3><FormattedMessage id="specialty.eye_specialist"/></h3>
                </div>
                <div className='img-customize'>
                    <img src={Specialty_fetal_ultrasound} alt='Specialty fetal ultrasound' />
                    <h3><FormattedMessage id="specialty.fetal_ultrasound"/></h3>
                </div>
                <div className='img-customize'>
                    <img src={Specialty_general_dentistry} alt='Specialty general dentistry' />
                    <h3><FormattedMessage id="specialty.general_dentistry"/></h3>
                </div>
                <div className='img-customize'>
                    <img src={Specialty_mental_health} alt='Specialty mental health' />
                    <h3><FormattedMessage id="specialty.mental_health"/></h3>
                </div>
                <div className='img-customize'>
                    <img src={Specialty_musculoskeletal} alt='Specialty musculoskeletal' />
                    <h3><FormattedMessage id="specialty.musculoskeletal"/></h3>
                </div>
                <div className='img-customize'>
                    <img src={Specialty_nerve} alt='Specialty nerve' />
                    <h3><FormattedMessage id="specialty.nerve"/></h3>
                </div>
                <div className='img-customize'>
                    <img src={Specialty_respiratory_lung} alt='Specialty respiratory lung' />
                    <h3><FormattedMessage id="specialty.respiratory_lung"/></h3>
                </div>
                 <div className='img-customize'>
                    <img src={Specialty_spine} alt='Specialty spine' />
                    <h3><FormattedMessage id="specialty.spine"/></h3>
                </div>
                <div className='img-customize'>
                    <img src={Specialty_thyroid} alt='Specialty thyroid' />
                    <h3><FormattedMessage id="specialty.thyroid"/></h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
