import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { FormattedMessage } from 'react-intl';
import DatePicker from "../../../components/Input/DatePicker";
import moment from 'moment';
import { getPatientByDocotorId, confirmPatientAppointment } from "../../../services/userService";
import { USER_ROLE } from '../../../utils';
import * as actions from "../../../store/actions";
import { Modal } from 'reactstrap';
import {CommonUtils} from "../../../utils";
import { toast } from 'react-toastify';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment().add(1, 'day').toDate(),
            patientList: [],
            doctorId: '' ,
            isOpenModal: false,
            email: '',
            imageBase64: '',
            selectedPatient: null,
            isLoading: false
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

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleToggle = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
            email: '',
            imageBase64: '',
            selectedPatient: null
        })
    }

    handleConfirm = (patient) => {
        this.setState({
            isOpenModal: true,
            email: patient.patientData?.email || '',
            selectedPatient: patient
        })
    }

    handleSubmit = async () => {
        try {
            if (!this.state.imageBase64) {
                toast.error('Vui lòng chọn file hóa đơn!');
                return;
            }

            if (!this.state.selectedPatient) {
                toast.error('Không tìm thấy thông tin bệnh nhân!');
                return;
            }

            this.setState({ isLoading: true });

            let { selectedPatient, imageBase64, doctorId } = this.state;
            let { language} = this.props;

            let requestData = {
                email: selectedPatient.patientData?.email,
                patientName: `${selectedPatient.patientData?.lastName || ''} ${selectedPatient.patientData?.firstName || ''}`,
                language: language,
                billImage: imageBase64,
                id: selectedPatient.id,
            };

            let res = await confirmPatientAppointment(requestData);
            
            if (res && res.errCode === 0) {
                toast.success('Xác nhận thành công và đã gửi hóa đơn qua email cho bệnh nhân!');
                this.handleToggle();
                this.fetchAllPatient(doctorId, moment(this.state.currentDate).format('YYYY-MM-DD'));
            } else {
                toast.error(res.message || 'Có lỗi xảy ra khi xác nhận!');
            }
        } catch (error) {
            console.error('Error confirming appointment:', error);
            toast.error('Có lỗi xảy ra khi xác nhận!');
        } finally {
           this.setState({ isLoading: false }); 
        }
    }

    render() {
        let { patientList } = this.state;
        let { language } = this.props;
        console.log("check ",this.state.selectedPatient)
        return (
        <>
            <div className="manage-patient-container">
                <h2 className="title">QUẢN LÝ BỆNH NHÂN KHÁM BỆNH</h2>

                <div className='row'>
                    <div className='col-3 form-group'>
                        <label><FormattedMessage id="manage-schedule.choose_date" /></label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className="form-control"
                            value={this.state.currentDate}
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
                                                onClick={() => this.handleConfirm(item)}
                                            >
                                                <FormattedMessage id="manage-patient.confirm" />
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
            <Modal className='manage-patient-modal-container' 
                    isOpen= {this.state.isOpenModal} 
                    toggle={() => {this.handleToggle()}} 
                    centered
                    size='lg'
                    > 
                <div className='manage-patient-modal-content'>
                    <div className='manage-patient-modal-header'>
                        <span className='left'>
                            <FormattedMessage id="manage-patient.modal-title" />
                        </span>
                        <span className='right' onClick={() => {this.handleToggle()}}>
                            <i className='fas fa-times'></i>
                        </span>
                    </div>
                    <div className='manage-patient-modal-body'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="manage-patient.email" />
                                </label>
                                <input className='form-control'  
                                value={this.state.email}
                                disabled={true}/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="manage-patient.bill" />
                                </label>
                                <input className='form-control-file' type='file'
                                    accept="image/*,.pdf"
                                    onChange={(event) => this.handleOnChangeImage(event)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='manage-patient-modal-footer'>
                        <button onClick={() => {this.handleSubmit()}} className='btn-manage-patient-confirm'>
                            <FormattedMessage id="manage-patient.confirm" />
                        </button>
                        <button onClick={() => {this.handleToggle()}} className='btn-manage-patient-cancel'>
                            <FormattedMessage id="manage-patient.cancel" />
                        </button>
                    </div>
                </div>
           </Modal>
            {this.state.isLoading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <span>Đang xử lý, vui lòng chờ...</span>
                </div>
            )}
        </>
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