import React, { Component } from 'react';
import { connect } from "react-redux";
import "./BookingModal.scss";
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import moment from 'moment';

class BookingModal extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          price : '',
          isShowInfo:false
        }
    }

   
    componentDidMount() {
       
    }

    componentDidUpdate(prevProps) {
       
    }

    toggle() {
      this.props.handleToggle();
    }

    handlePrice = (price) => {
        this.setState({
            price
        })
    }

    formatPrice = (price) => {
        if (!price) return '';
        
        
        const numericPrice = typeof price === 'string' ? parseFloat(price.replace(/[^\d]/g, '')) : price;
        
        if (this.props.language === 'vi') {
            return new Intl.NumberFormat('vi-VN', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(numericPrice) + ' VND';
        } else {
            return new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(numericPrice) + '$';
        }
    }

    handleShowInfoDoctor = (isShowed) => {
        this.setState({
            isShowInfo:isShowed
        })
    }

    capitalizeFirstLetter = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    render() {
        console.log(this.props.dataScheduleTimeModal)
        let formatPrice = this.formatPrice(this.state.price)
        let formattedDate = this.props.language === 'vi' ? moment(this.props.dataScheduleTimeModal?.date).format('DD-MM-YYYY') :
                            moment(this.props.dataScheduleTimeModal?.date).format('YYYY-MM-DD');
        let rawWeekday = moment(this.props.dataScheduleTimeModal?.date).locale(this.props.language === 'vi' ? 'vi' : 'en').format('dddd');
        let weekday = this.capitalizeFirstLetter(rawWeekday);
        let time = this.props.language === 'vi' ? this.props.dataScheduleTimeModal?.timeTypeData?.valueVi :
                   this.props.dataScheduleTimeModal?.timeTypeData?.valueEn;
        return (
           <Modal className='booking-modal-container' 
           isOpen= {this.props.isOpenModal} 
           toggle={() => {this.toggle()}} 
           centered
           size='lg'
           > 
            <div className='booking-modal-content'>
                <div className='booking-modal-header'>
                    <span className='left'>
                        <FormattedMessage id="booking.modal-title" />
                    </span>
                    <span className='right' onClick={() => {this.toggle()}}>
                        <i className='fas fa-times'></i>
                    </span>
                </div>
                 <div className='booking-modal-body'>
                    {/* {JSON.stringify(this.props.dataScheduleTimeModal)} */}
                    <div className='doctor-info'>
                        <ProfileDoctor doctorId={this.props?.dataScheduleTimeModal?.doctorID}
                                       handlePrice={this.handlePrice}
                                       isShowDescriptionDoctor={this.state.isShowInfo}
                                       handleShowInfoDoctor={this.handleShowInfoDoctor}
                         />
                         <span><FormattedMessage id="booking.time-booking" /> {time} - {weekday} - {formattedDate}</span>
                    </div>
                    <div className='price'>
                        <FormattedMessage id="booking.examination-price" /> {formatPrice}
                    </div>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id="booking.full-name" />
                            </label>
                            <input className='form-control' />
                        </div>
                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id="booking.phone-number" />
                            </label>
                            <input className='form-control' />
                        </div>
                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id="booking.email" />
                            </label>
                            <input className='form-control' />
                        </div>
                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id="booking.address" />
                            </label>
                            <input className='form-control' />
                        </div>
                        <div className='col-12 form-group'>
                            <label>
                                <FormattedMessage id="booking.reason" />
                            </label>
                            <input className='form-control' />
                        </div>
                         <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id="booking.book-for" />
                            </label>
                            <input className='form-control' />
                        </div>
                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id="booking.gender" />
                            </label>
                            <input className='form-control' />
                        </div>

                    </div>
                </div>
                 <div className='booking-modal-footer'>
                    <button className='btn-booking-confirm'>
                        <FormattedMessage id="booking.confirm" />
                    </button>
                    <button onClick={() => {this.toggle()}} className='btn-booking-cancel'>
                        <FormattedMessage id="booking.cancel" />
                    </button>
                </div>
            </div>
           </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);