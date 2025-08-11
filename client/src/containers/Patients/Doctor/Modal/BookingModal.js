import React, { Component } from 'react';
import { connect } from "react-redux";
import "./BookingModal.scss";
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import moment from 'moment';
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { injectIntl } from 'react-intl';
import {postBookingAppointment} from "../../../../services/userService";
import {  toast } from 'react-toastify';

class BookingModal extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          fullName:'',
          phoneNumber:'',
          email:'',
          address:'',
          reason:'',
          birthday:'',
          gender:'',
          doctorId:'',
          price : '',
          timeType:'',
          timeBooking:'',
          doctorName: '',
          isShowInfo:false
        }
    }

   
    componentDidMount() {
        this.props.fetchGenderStartAdmin();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.dataScheduleTimeModal !== this.props.dataScheduleTimeModal &&
            this.props.dataScheduleTimeModal?.doctorID)
        {
            let timeBooking = this.props.language === 'vi' ? this.props.dataScheduleTimeModal?.timeTypeData?.valueVi :
                     this.props.dataScheduleTimeModal?.timeTypeData?.valueEn;
            let weekday = this.capitalizeFirstLetter(moment
                            (this.props.dataScheduleTimeModal?.date).locale(this.props.language === 'vi' ? 'vi' : 'en').format('dddd'));
            let dayBooking = this.props.language === 'vi' ? moment(this.props.dataScheduleTimeModal?.date).format('DD-MM-YYYY') :
                            moment(this.props.dataScheduleTimeModal?.date).format('YYYY-MM-DD');
            let timeTypeString = `${timeBooking} - ${weekday} - ${dayBooking}`;
            this.setState({
                doctorId: this.props.dataScheduleTimeModal.doctorID,
                timeBooking: timeTypeString,
                timeType:  this.props.dataScheduleTimeModal.timeType
            })
            this.setState({
                fullName: `${this.props.userInfo.lastName} ${this.props.userInfo.firstName} `,
                email: this.props.userInfo.email
            })
        }    
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

    handleOnchangeInput = (event,name) => {
        this.setState({
         [name]: event.target.value
        });
    };

    handleOnChangeDate = (date) => {
        this.setState({
            birthday: date[0]
        });
    };

    handleSubmit = async () => {
      let date =  moment(this.props.dataScheduleTimeModal?.date).format('YYYY-MM-DD');
      let res = await postBookingAppointment({
          fullName:this.state.fullName,
          phoneNumber:this.state.phoneNumber,
          email:this.state.email,
          address:this.state.address,
          reason:this.state.reason,
          date:date,
          gender:this.state.gender,
          doctorId:this.state.doctorId,
          timeType: this.state.timeType,
          timeBooking: this.state.timeBooking,
          doctorName: this.state.doctorName,
          language: this.props.language
      })

      if(res && res.errCode === 0){
        toast.success(res.message);
        this.toggle();
        this.setState( {
          fullName:'',
          phoneNumber:'',
          email:'',
          address:'',
          reason:'',
          birthday:'',
          gender:'',
          doctorId:'',
          timeType:'',
        })
      }
      else{
        toast.error(res.message);
      }
    }

    handleGetDoctorName = (data) => {
        let doctorName = `${data?.lastName} ${data?.firstName}`
        this.setState({
            ...this.state,
            doctorName: doctorName
        })
    }

    render() {
        let formatPrice = this.formatPrice(this.state.price)
        let formattedDate = this.props.language === 'vi' ? moment(this.props.dataScheduleTimeModal?.date).format('DD-MM-YYYY') :
                            moment(this.props.dataScheduleTimeModal?.date).format('YYYY-MM-DD');
        let rawWeekday = moment(this.props.dataScheduleTimeModal?.date).locale(this.props.language === 'vi' ? 'vi' : 'en').format('dddd');
        let weekday = this.capitalizeFirstLetter(rawWeekday);
        let time = this.props.language === 'vi' ? this.props.dataScheduleTimeModal?.timeTypeData?.valueVi :
                   this.props.dataScheduleTimeModal?.timeTypeData?.valueEn;
        let {genders,language} = this.props;
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
                                       handleGetDoctorName={this.handleGetDoctorName}
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
                            <input className='form-control' 
                              value={this.state.fullName}
                              disabled={true}/>
                        </div>
                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id="booking.phone-number" />
                            </label>
                            <input className='form-control'
                              value={this.state.phoneNumber}
                              onChange={(event) => this.handleOnchangeInput(event,'phoneNumber')}/>
                        </div>
                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id="booking.email" />
                            </label>
                            <input className='form-control'  
                             value={this.state.email}
                             disabled={true}/>
                        </div>
                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id="booking.address" />
                            </label>
                            <input className='form-control' 
                             value={this.state.address}
                             onChange={(event) => this.handleOnchangeInput(event,'address')}/>
                        </div>
                        <div className='col-12 form-group'>
                            <label>
                                <FormattedMessage id="booking.reason" />
                            </label>
                            <input className='form-control' 
                             value={this.state.reason}
                             onChange={(event) => this.handleOnchangeInput(event,'reason')}/>
                            
                        </div>
                         <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id="booking.book-for" />
                            </label>
                            <DatePicker
                                style={{cursor:'pointer'}}
                                onChange={this.handleOnChangeDate}
                                className="form-control"
                                value={this.state.birthday}
                                maxDate={moment().startOf('day').toDate()}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id="booking.gender" />
                            </label>
                           <select className="form-control" onChange={(event) => this.handleOnchangeInput(event,'gender')}>
                                {this.state.gender === '' && (
                                    <option value="" hidden>
                                       {this.props.intl.formatMessage({ id: 'booking.select-gender' })}
                                    </option>
                                )}
                                {genders && genders.length > 0 && genders.map((item,index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>{language === 'vi' ? item.valueVi : item.valueEn}</option>
                                    )
                                })}
                            </select>
                        </div>

                    </div>
                </div>
                 <div className='booking-modal-footer'>
                    <button onClick={() => {this.handleSubmit()}} className='btn-booking-confirm'>
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
        language: state.app.language,
        genders: state.admin.genders,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStartAdmin: (() => dispatch(actions.fetchGenderStart()))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BookingModal));