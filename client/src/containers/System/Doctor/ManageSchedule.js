import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
import moment from 'moment';
import {  toast } from 'react-toastify';
import { saveBulkScheduleDoctor,handleGetDoctorById } from '../../../services/userService';
import { USER_ROLE } from '../../../utils';

class ManageSchedule extends Component {
     
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor:'',
            currentDate: moment().add(1, 'day').toDate(),
            rangeTime: []
        }
    }

    componentDidMount() {
       this.props.fetchAllDoctorStartAdmin();
       this.props.fetchAllScheduleTimesAdmin();
    }

    builtDataInputSelect = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0) {
            inputData.map((item,index) => {
                let object = {};

                object.label = `${item.lastName} ${item.firstName}`;
                object.value = item.id;
                result.push(object);
            })
        }else if(inputData) {
            let object = {};

            object.label = `${inputData.lastName} ${inputData.firstName}`;
            object.value = inputData.id;
            result.push(object);
        }
        return result;

    }

    async componentDidUpdate(prevProps) {
        if(prevProps.allDoctors !== this.props.allDoctors) {
            if(this.props.userInfo.roleID === USER_ROLE.ADMIN)
            {
               let dataSelect = this.builtDataInputSelect(this.props.allDoctors);
                this.setState({
                    allDoctors: dataSelect
                });
            } else if(this.props.userInfo.roleID === USER_ROLE.DOCTOR){
                let idDoctor = '';
                for (const item of this.props.allDoctors){
                    if(this.props.userInfo.email === item.email){
                       idDoctor = item.id
                    }
                }
                let res = await handleGetDoctorById(idDoctor);
                let dataSelect = this.builtDataInputSelect(res.data);
                    this.setState({
                        allDoctors: dataSelect
                    });
            }
        }
        if(prevProps.allScheduleTimes !== this.props.allScheduleTimes) {
            let data = this.props.allScheduleTimes;
            if (data && data.length > 0) {
                data = data.map(item =>({...item,isSelected: false}))
            }
            this.setState({
                rangeTime: data
            });
        }
    }

    handleChange = (selectedDoctor) => {
        this.setState({ 
            selectedDoctor : selectedDoctor
        } 
        );
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if(rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if(item.id === time.id) {
                    item.isSelected = !item.isSelected;
                     this.setState({
                        rangeTime: rangeTime
                     })
                    return item;
                }
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];

        if(!currentDate){
            toast.error("Please choose date !");
            return;
        }
        if(!selectedDoctor){
            toast.error("Please choose doctor !");
            return;
        }

        let formatedDate = moment(currentDate).startOf('day').toISOString()
        
        if(rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if(selectedTime && selectedTime.length > 0) {
                selectedTime.map(time => {
                    let object = {};
                    object.doctorID = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = time.keyMap;
                    result.push(object); 
                })
            }
            else{
                toast.error("Please choose time for booking doctor !");
                return;
            }
        }

        let res = await saveBulkScheduleDoctor({
            arrSchedule : result,
        });

        if(res && res.errCode === 0) {
        toast.success("Schedule created successfully!");
       
        } else if(res && res.errCode === 2) {
            rangeTime = rangeTime.map(item => {
                if(res.conflictingTimeType === item.keyMap) {
                    toast.error(`This doctor already has a schedule for this ${this.props.language === 'vi' ? item.valueVi : item.valueEn}`);
                    return;
                }
            })
           
        } else {
            toast.error("Failed to create schedule!");
        }
        
        }

    render() {
        let { rangeTime } = this.state;
        return (
          <div className='manage-schedule-container'>
             <div className='manage-schedule-title'>
                <FormattedMessage id="manage-schedule.title" />
             </div>
             <div className='container'>
                <div className='row'>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="manage-schedule.choose_doctor" /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.allDoctors}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="manage-schedule.choose_date" /></label>
                        <DatePicker
                           onChange={this.handleOnChangeDatePicker}
                           className="form-control"
                           value={this.state.currentDate}
                           minDate={moment().add(1, 'day').startOf('day').toDate()}
                         />
                    </div>
                    </div>
                <div className='row'>
                    <div className='col-12 pick-hour-container'>
                        {rangeTime && rangeTime.length > 0 && 
                        rangeTime.map((item,index) => {
                           return (
                             <button className={item?.isSelected === true ? 'btn btn-schedule-time active' : 'btn btn-schedule-time'} onClick={() => this.handleClickBtnTime(item)}
                              key={index}>
                               {this.props.language === 'vi' ? item?.valueVi : item?.valueEn}
                              </button>
                           )
                        })}
                    </div>
                </div>
                <div className='row'>
                  <div className='col-12'>
                    <button className='btn btn-primary btn-save-schedule'
                       onClick={this.handleSaveSchedule}
                    >
                        <FormattedMessage id="manage-schedule.save_schedule" /></button>
                  </div>
                </div>
                
             </div>
          </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        allScheduleTimes: state.admin.allScheduleTimes,
        language: state.app.language,
        userInfo : state.user.userInfo   
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorStartAdmin: (() => dispatch(actions.fetchAllDoctorStart())),
        fetchAllScheduleTimesAdmin: (() => dispatch(actions.fetchAllScheduleTimes())),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
