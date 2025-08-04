import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Section.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';
import {getAllSpecialty} from '../../../services/userService';
import { withRouter } from 'react-router-dom';

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

class Specialty extends Component {
    constructor(props){
        super()
        this.state = {
            dataSpecialty: []
        }
    }
    async componentDidMount(){
        let res = await getAllSpecialty();
        if(res && res.errCode === 0){
            this.setState({
                dataSpecialty:res.data
            })
        }
    }
    handleViewDetailSpecialty = (item) => {
      if (this.props.history) {
        this.props.history.push(`/detail-specialty/${item.id}`);
      }
    }
    render() {
        let {dataSpecialty} = this.state
        let settings = {
            dots: false,
            infinite: dataSpecialty.length > 4,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        }
        return (
          <div className='section-container'>
            <div className='section-content'>
              <div className='section-header'>
                <h3><FormattedMessage id="specialty.specialty"/></h3>
                <span><FormattedMessage id="specialty.viewmore"/></span>
              </div>
             <Slider {...settings}>
                {dataSpecialty && dataSpecialty.length && dataSpecialty.map((item,index) => {
                    return(
                    <div className='img-customize' key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                        <img src={item.image} alt='Specialty cardiovascular' />
                        <h3>{item.name}</h3>
                    </div>
                )}
                )}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
