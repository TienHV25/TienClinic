import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Handlebook.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {LANGUAGE} from '../../../utils';
import {changeLanguage} from '../../../store/actions';
import handlebook from "../../../assets/handlebook/handlebook.jpg";

class Handlebook extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        }
        return (
          <div className='handlebook-container'>
            <div className='handlebook-content'>
              <div className='handlebook-header'>
                <h3>Cẩm nang</h3>
                <span>Xem Thêm</span>
              </div>
             <Slider {...settings}>
                <div className='img-customize'>
                    <img src={handlebook} alt='Handlebook' />
                    <h3>Khám chữa loãng xương ở đâu tốt tại TP.HCM?</h3>
                </div>
                <div className='img-customize'>
                    <img src={handlebook} alt='Handlebook' />
                    <h3>Khám chữa loãng xương ở đâu tốt tại TP.HCM?</h3>
                </div>
                <div className='img-customize'>
                    <img src={handlebook} alt='Handlebook' />
                    <h3>Khám chữa loãng xương ở đâu tốt tại TP.HCM?</h3>
                </div>
                <div className='img-customize'>
                    <img src={handlebook} alt='Handlebook' />
                    <h3>Khám chữa loãng xương ở đâu tốt tại TP.HCM?</h3>
                </div>
                <div className='img-customize'>
                    <img src={handlebook} alt='Handlebook' />
                    <h3>Khám chữa loãng xương ở đâu tốt tại TP.HCM?</h3>
                </div>
                <div className='img-customize'>
                    <img src={handlebook} alt='Handlebook' />
                    <h3>Khám chữa loãng xương ở đâu tốt tại TP.HCM?</h3>
                </div>
                <div className='img-customize'>
                    <img src={handlebook} alt='Handlebook' />
                    <h3>Khám chữa loãng xương ở đâu tốt tại TP.HCM?</h3>
                </div>
                <div className='img-customize'>
                    <img src={handlebook} alt='Handlebook' />
                    <h3>Khám chữa loãng xương ở đâu tốt tại TP.HCM?</h3>
                </div>
                <div className='img-customize'>
                    <img src={handlebook} alt='Handlebook' />
                    <h3>Khám chữa loãng xương ở đâu tốt tại TP.HCM?</h3>
                </div>
                <div className='img-customize'>
                    <img src={handlebook} alt='Handlebook' />
                    <h3>Khám chữa loãng xương ở đâu tốt tại TP.HCM?</h3>
                </div>
                 <div className='img-customize'>
                    <img src={handlebook} alt='Handlebook' />
                    <h3>Khám chữa loãng xương ở đâu tốt tại TP.HCM?</h3>
                </div>
                <div className='img-customize'>
                    <img src={handlebook} alt='Handlebook' />
                    <h3>Khám chữa loãng xương ở đâu tốt tại TP.HCM?</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handlebook);
