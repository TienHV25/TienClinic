import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { FormattedMessage } from 'react-intl';
import DatePicker from "../../../components/Input/DatePicker";
import moment from 'moment';
import { getPatientByDocotorId } from "../../../services/userService";
import { USER_ROLE } from '../../../utils';
import * as actions from "../../../store/actions";

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment().add(1, 'day').toDate(),
            patientList: [],
            doctorId: '' 
        }
    }

    componentDidMount() {
        if (this.props.userInfo.roleID === USER_ROLE.DOCTOR) {
            this.props.fetchAllDoctorStartAdmin();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors && this.props.userInfo.roleID === USER_ROLE.DOCTOR) {
            const foundDoctor = this.props.allDoctors.find(item => item.email === this.props.userInfo.email);
            if (foundDoctor) {
                this.setState({ doctorId: foundDoctor.id }, () => {
                    this.fetchAllPatient(foundDoctor.id, moment(this.state.currentDate).format('YYYY-MM-DD'));
                });
            }
        }

        if (prevState.currentDate !== this.state.currentDate && this.state.doctorId) {
            this.fetchAllPatient(this.state.doctorId, moment(this.state.currentDate).format('YYYY-MM-DD'));
        }
    }

    fetchAllPatient = async (doctorID, date) => {
        let res = await getPatientByDocotorId(doctorID, date);
        if (res && res.errCode === 0) {
            let data = Array.isArray(res.data) ? res.data : (res.data ? [res.data] : []);
            this.setState({ patientList: data });
        } else {
            this.setState({ patientList: [] });
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        });
    }

    handleConfirm = (id) => {
        alert(`Xác nhận bệnh nhân ID: ${id}`);
    }

    render() {
        let { patientList } = this.state;
        let { language } = this.props;
        return (
            <div className="manage-patient-container">
                <h2 className="title">QUẢN LÝ BỆNH NHÂN KHÁM BỆNH</h2>

                <div className='row'>
                    <div className='col-3 form-group'>
                        <label><FormattedMessage id="manage-schedule.choose_date" /></label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className="form-control"
                            value={this.state.currentDate}
                            minDate={moment().startOf('day').toDate()}
                        />
                    </div>
                </div>

                <div className="table-wrapper">
                    <table className="patient-table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Thời gian</th>
                                <th>Họ và tên</th>
                                <th>Địa chỉ</th>
                                <th>Giới tính</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientList && patientList.length > 0 ? (
                                patientList.map((item, index) => (
                                    <tr key={item.id || index}>
                                        <td>{index + 1}</td>
                                        <td>{(language === 'vi' ? item.timeTypeDataBooking?.valueVi 
                                             : item.timeTypeDataBooking?.valueEn) || ''}</td>
                                        <td>{`${item.patientData?.lastName || ''} ${item.patientData?.firstName || ''}`}</td>
                                        <td>{item.patientData?.address || ''}</td>
                                        <td>{(language === 'vi' ? item.patientData?.genderData?.valueVi  
                                              : item.patientData?.genderData?.valueEn) || ''}</td>
                                        <td>
                                            <button
                                                className="btn-confirm"
                                                onClick={() => this.handleConfirm(item.id)}
                                            >
                                                Xác nhận
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>Không có bệnh nhân</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorStartAdmin: () => dispatch(actions.fetchAllDoctorStart()),
        fetchAllScheduleTimesAdmin: () => dispatch(actions.fetchAllScheduleTimes()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
