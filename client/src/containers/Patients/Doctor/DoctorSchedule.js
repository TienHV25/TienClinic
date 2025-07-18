import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from 'moment';
import localization from 'moment/locale/vi';
import {getScheduleDoctorByDate} from '../../../services/userService';
import { FormattedMessage } from 'react-intl';


class DoctorSchedule extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          allDays : [],
          allAvalableTime: []
        }
    }
    
    setArray = () => {
        let arrDate = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            let date = moment(new Date()).add(i, 'days');
            if(this.props.language === 'vi')
            {
            let label = date.format('dddd - DD/MM');
            label = label.charAt(0).toUpperCase() + label.slice(1);
            object.label = label;
            }
            else if(this.props.language === 'en')
            {
            object.label = date.locale('en').format('ddd - DD/MM');
            }
            object.value = date.startOf('day').format('YYYY-MM-DD');
        
            arrDate.push(object);
        }
        this.setState({
            allDays: arrDate
        });
        return arrDate;
    }

    async componentDidMount() {
      const allDays = await this.setArray();
      if (allDays.length > 0) {
        const firstDate = allDays[0].value;
        await this.handleDateChange(this.props.doctorID, firstDate);
      }
    }

    componentDidUpdate(prevProps) {
        if(this.props.language !== prevProps.language) {
          this.setArray();
        }
    }

    handleDateChange = async (doctorID,date) => {
        let res = await getScheduleDoctorByDate(doctorID,date)
        
        if(res && res.errCode === 0) {
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }
    }


    render() {
        let { allDays,allAvalableTime} = this.state;
        let { language } = this.props;
        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                  <select onChange={(event) => this.handleDateChange(this.props.doctorID,event.target.value)}>
                    {allDays && allDays.length > 0 && allDays.map((item,index) => {
                        return (
                            <option key={index} value={item.value}>{item.label}</option>
                        )
                    })}
                  </select>
                </div>
                <div className='all-avaiable-time'>
                    <div className='text-calendar'>
                       <i className='fas fa-calendar-alt'></i><span><FormattedMessage id="doctor.schedule"/></span>
                    </div>
                    <div className='time-content'>
                        <>
                            <div className='time-content-button'>
                                {allAvalableTime && allAvalableTime.length > 0 ? allAvalableTime.map((item,index) => {
                                    return (
                                        <button key={index}>{language === 'vi' ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}</button>
                                    )
                                })
                                :
                                <div className='no-schedule'><span><FormattedMessage id="doctor.no-schedule-noti"/></span></div>
                                }
                            </div>

                            <div className='book-fee'>
                                <span><FormattedMessage id="doctor.choose"/> <i className='far fa-hand-point-up'></i> <FormattedMessage id="doctor.book-schedule"/></span>
                            </div>
                        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
