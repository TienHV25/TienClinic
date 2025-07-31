import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import {getProfileDoctorById} from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class ProfileDoctor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          dataProfile: {}
        }
    }

    handleGetProfileDoctorById = async (id) => {
        let res = await getProfileDoctorById(id);
        if(res && res.errCode === 0){
            this.setState({
            dataProfile: res.data
        },() => {
            const price = this.props.language === 'vi'
                ? res.data?.Doctor_infor?.priceIdData?.valueVi
                : res.data?.Doctor_infor?.priceIdData?.valueEn;

            if (this.props.handlePrice && price) {
                this.props.handlePrice(price); 
            }

            if (this.props.handleGetDoctorName) {
                this.props.handleGetDoctorName(res.data);
            }
        }
        )
        }
    }

    handleShowInfo = (isShowed) => {
        if(this.props.handleShowInfoDoctor){
            this.props.handleShowInfoDoctor(isShowed);
        }
    }

   
    componentDidMount() {
        let id = this.props.doctorId;
        this.handleGetProfileDoctorById(id);
    }

    componentDidUpdate(prevProps) {
       if(prevProps.doctorId !== this.props.doctorId){
          this.handleGetProfileDoctorById(this.props.doctorId);
       }
    }

    render() {
        let {dataProfile} = this.state;
        let {isShowDescriptionDoctor} = this.props;
        return (
           <div className='intro-doctor'>
                    <div className='content-left' style={{backgroundImage: `url(${dataProfile?.image})`}}>
                            
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                           {this.props.language === 'vi' ? dataProfile?.positionData?.valueVi : dataProfile?.positionData?.valueEn} {dataProfile?.lastName} {dataProfile?.firstName}
                        </div>
                        <div className='down'>
                         {isShowDescriptionDoctor === true ?
                            <>
                              {dataProfile?.Markdown?.description}
                              <span onClick={() => this.handleShowInfo(false)}><FormattedMessage id="booking.hide" /></span>
                            </>
                          :
                            <>
                              <span onClick={() => this.handleShowInfo(true)}><FormattedMessage id="booking.show" /></span>
                            </>
                        }
                        </div>
                    </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
