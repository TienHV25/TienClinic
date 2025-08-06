import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import {getDoctorOfSpecialty,getSpecialtyDetail} from '../../../services/userService';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtralnfor from '../Doctor/DoctorExtralnfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { withRouter } from 'react-router-dom';
import * as actions from "../../../store/actions";
import Select from 'react-select';

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: state.isFocused ? '1px solid #2684FF' : '1px solid #ccc',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(38,132,255,0.2)' : 'none',
    padding: '2px 4px',
    minHeight: '36px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      borderColor: '#2684FF',
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: '#333',
    fontWeight: '500',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: '#888',
    '&:hover': {
      color: '#555',
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '8px',
    zIndex: 99,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? '#2684FF'
      : state.isFocused
      ? '#f0f8ff'
      : '#fff',
    color: state.isSelected ? '#fff' : '#333',
    padding: '10px 15px',
    cursor: 'pointer',
  }),
};

class DetailSpecialty extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
           doctors: [],
           allProvince: [],
           showInfoMap: {},
           specialty:{},
           selectedProvince:{},
        }
    }
    
    fetchSpecialtyOfDoctor = async (specialtyId) => {
        let res = await getDoctorOfSpecialty(specialtyId);
        this.setState({
            doctors:res.data
        })   
    };

    fetchSpecialtyOfDetail = async (id) => {
        let res = await getSpecialtyDetail(id);
        this.setState({
            specialty:res.data
        })   
    };

    componentDidMount() {
       this.fetchSpecialtyOfDoctor(this.props.match.params.id);
       this.fetchSpecialtyOfDetail(this.props.match.params.id);
       this.props.fetchDoctorProvinceStartAdmin();
    };

    builtDataInputSelectProvince = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0) {
            inputData.map((item,index) => {
                let object = {};

                object.label = this.props.language === 'vi' ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        let object = {};
        object.label = 'Toàn quốc';
        object.value = '';
        result.push(object);

        return result;
    };

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.fetchSpecialtyOfDoctor(this.props.match.params.id);
            this.fetchSpecialtyOfDetail(this.props.match.params.id);
        }
        if(prevProps.doctorProvince !== this.props.doctorProvince ||
        prevProps.language !== this.props.language) {
           let provinceSelect = this.builtDataInputSelectProvince(this.props.doctorProvince);
           let defaultProvince = provinceSelect.find(item => item.value === '');

           this.setState({
            allProvince: provinceSelect,
            selectedProvince: defaultProvince 
           });
        }
    };

    handleShowInfoDoctor = (doctorId, isShowed) => {
        this.setState((prevState) => ({
            showInfoMap: {
            ...prevState.showInfoMap,
            [doctorId]: isShowed
            }
        }));
    }

    navigateToDetailDoctor = (doctorId) => {
     if (this.props.history) {
         this.props.history.push(`/detail-doctor/${doctorId}`);
      }
    };

    handleChangeProvince = async (selectedProvince) => {
      this.setState({ 
        selectedProvince
      } 
      );
    }

    render() {
        let {doctors,specialty,selectedProvince} = this.state;
        return (
          <>
            <HomeHeader />
            <div className='detail-specialty-container'>
                <div className='detail-specialty-infor'>
                   <div dangerouslySetInnerHTML={{__html:  specialty?.descriptionHTML}}>
                    </div>
                </div>
                <div className='detail-specialty-doctor-content'>
                    <div className='detail-specialty-select'>
                        <Select
                            styles={customSelectStyles}
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeProvince}
                            options={this.state.allProvince}
                        />
                    </div>
                   {selectedProvince.value !== '' 
                        ? (() => {
                            const filteredDoctors = doctors.filter(item => item?.provinceId === selectedProvince.value);

                            if (filteredDoctors.length === 0) {
                                return (
                                    <div className="no-doctor-message">
                                        Không có bác sĩ ở tỉnh thành này, vui lòng chọn tỉnh thành khác!
                                    </div>
                                );
                            }

                            return filteredDoctors.map((item, index) => (
                                <div className='detail-specialty-doctor' key={item?.doctorId}>
                                    <div className='detail-specialty-doctor-left'>
                                        <ProfileDoctor
                                            doctorId={item?.doctorId}
                                            isShowDescriptionDoctor={this.state.showInfoMap[item?.doctorId] || false}
                                            handleShowInfoDoctor={(isShowed) =>
                                                this.handleShowInfoDoctor(item?.doctorId, isShowed)
                                            }
                                        />
                                        <div className='detail-doctor' onClick={() => this.navigateToDetailDoctor(item?.doctorId)}>
                                            <span>Xem chi tiết bác sĩ</span>
                                        </div>
                                    </div>
                                    <div className='detail-specialty-doctor-right'>
                                        <div className='detail-specialty-doctor-right-up'>
                                            <DoctorSchedule doctorID={item?.doctorId} />
                                        </div>
                                        <div className='detail-specialty-doctor-right-down'>
                                            <DoctorExtralnfor doctorID={item?.doctorId} />
                                        </div>
                                    </div>
                                </div>
                            ));
                        })()
                        : doctors && doctors.length > 0 && doctors.map((item, index) => (
                            <div className='detail-specialty-doctor' key={item?.doctorId}>
                                <div className='detail-specialty-doctor-left'>
                                    <ProfileDoctor
                                        doctorId={item?.doctorId}
                                        isShowDescriptionDoctor={this.state.showInfoMap[item?.doctorId] || false}
                                        handleShowInfoDoctor={(isShowed) =>
                                            this.handleShowInfoDoctor(item?.doctorId, isShowed)
                                        }
                                    />
                                    <div className='detail-doctor' onClick={() => this.navigateToDetailDoctor(item?.doctorId)}>
                                        <span>Xem chi tiết bác sĩ</span>
                                    </div>
                                </div>
                                <div className='detail-specialty-doctor-right'>
                                    <div className='detail-specialty-doctor-right-up'>
                                        <DoctorSchedule doctorID={item?.doctorId} />
                                    </div>
                                    <div className='detail-specialty-doctor-right-down'>
                                        <DoctorExtralnfor doctorID={item?.doctorId} />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
          </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctorProvince: state.admin.doctorProvince,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorProvinceStartAdmin: (() => dispatch(actions.fetchDoctorProvinceStart())),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty));
