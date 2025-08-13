import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Handlebook.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {LANGUAGE} from '../../../utils';
import {changeLanguage} from '../../../store/actions';
import {getAllHandbook} from '../../../services/userService';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

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

class Handlebook extends Component {
    constructor(props){
        super()
        this.state = {
            dataHandbook: []
        }
    }

    async componentDidMount(){
        let res = await getAllHandbook(this.props.limit);
        if(res && res.errCode === 0){
            this.setState({
                dataHandbook:res.data
            })
        }
    }

    handleViewDetailHandbook = (item) => {
      if (this.props.history) {
        this.props.history.push(`/detail-handbook/${item.id}`);
      }
    }

    render() {
        let {dataHandbook} = this.state
        let settings = {
            dots: false,
            infinite: dataHandbook.length > 4,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        }
        return (
          <div className='handlebook-container'>
            <div className='handlebook-content'>
              <div className='handlebook-header'>
                <h3><FormattedMessage id="handbook.handbook"/></h3>
                <span onClick={() => this.props.history.push('/all-handbook')}><FormattedMessage id="handbook.viewmore"/></span>
              </div>
             <Slider {...settings}>
                {dataHandbook && dataHandbook.length && dataHandbook.map((item,index) => {
                    return(
                    <div className='img-customize' key={index} onClick={() => this.handleViewDetailHandbook(item)}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handlebook));
