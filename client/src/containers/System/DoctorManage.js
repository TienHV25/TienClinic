import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./DoctorManage.scss";
import * as actions from "../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import { handleGetDoctorById } from "../../services/userService"
import { adminActions } from '../../utils/constant';

const mdParser = new MarkdownIt();

class DoctorManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentHTML:'',
            contentMarkdown:'',
            selectedDoctor:'',
            description: '',
            hasOldData: false,
            selectedPrice:'',
            selectedPayment:'',
            selectedProvince:'',
            selectedSpecialty:'',
            selectedClinic:'',
            nameClinic: '',
            addressClinic: '',
            note: '',
            allDoctors: [],
            allPrice: [],
            allPayment: [],
            allProvince: [],
            specialty: [],
            clinic: []
        }
    }

    componentDidMount() {
       this.props.fetchAllDoctorStartAdmin();
       this.props.fetchDoctorPriceStartAdmin();
       this.props.fetchDoctorPaymentStartAdmin();
       this.props.fetchDoctorProvinceStartAdmin();
       this.props.fetchSpecialtyStartAdmin();
       this.props.fetchClinicStartAdmin();
    }

    builtDataInputSelectAllDoctor = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0) {
            inputData.map((item,index) => {
                let object = {};

                object.label = `${item.lastName} ${item.firstName}`;
                object.value = item.id;
                result.push(object);
            })
        }

        return result;
    }

    builtDataInputSelectPrice = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0) {
            inputData.map((item,index) => {
                let object = {};

                object.label = this.props.language === 'vi' ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }

        return result;
    }

    builtDataInputSelectPayment = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0) {
            inputData.map((item,index) => {
                let object = {};

                object.label = this.props.language === 'vi' ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }

        return result;
    }

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

        return result;
    }

    builtDataInputSelectSpecialty = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0) {
            inputData.map((item,index) => {
                let object = {};

                object.label = item.name;
                object.value = item.id;
                result.push(object);
            })
        }

        return result;
    }

    builtDataInputSelectClinic = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0) {
            inputData.map((item,index) => {
                let object = {};

                object.label = item.name;
                object.value = item.id;
                result.push(object);
            })
        }

        return result;
    }


    componentDidUpdate(prevProps) {
        if(prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.builtDataInputSelectAllDoctor(this.props.allDoctors);
            this.setState({
                allDoctors: dataSelect
            });
        }
        if (prevProps.saveDoctorSuccess !== this.props.saveDoctorSuccess && this.props.saveDoctorSuccess) {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                selectedDoctor: '',
                description: '',
                selectedPrice:'',
                selectedPayment:'',
                selectedProvince:'',
                selectedSpecialty:'',
                nameClinic: '',
                addressClinic: '',
                note: '',
                hasOldData: false
            }
            , () => {
            this.props.resetDoctorSuccessAdmin();
            }
            );
        }
        if(prevProps.doctorPrice !== this.props.doctorPrice ||
        prevProps.language !== this.props.language) {
           let priceSelect = this.builtDataInputSelectPrice(this.props.doctorPrice);
            this.setState({
                allPrice: priceSelect
            });
        }
        if(prevProps.doctorPayment !== this.props.doctorPayment ||
        prevProps.language !== this.props.language) {
           let paymentSelect = this.builtDataInputSelectPayment(this.props.doctorPayment);
            this.setState({
                allPayment: paymentSelect
            });
        }
        if(prevProps.doctorProvince !== this.props.doctorProvince ||
        prevProps.language !== this.props.language) {
           let provinceSelect = this.builtDataInputSelectProvince(this.props.doctorProvince);
            this.setState({
                allProvince: provinceSelect
            });
        }
        if(prevProps.specialty !== this.props.specialty ||
        prevProps.language !== this.props.language) {
           let specialtySelect = this.builtDataInputSelectSpecialty(this.props.specialty);
            this.setState({
                specialty: specialtySelect
            });
        }
        if(prevProps.clinic !== this.props.clinic ||
        prevProps.language !== this.props.language) {
           let clinicSelect = this.builtDataInputSelectClinic(this.props.clinic);
            this.setState({
                clinic: clinicSelect
            });
        }
        if(
                prevProps.language !== this.props.language &&
                (this.state.selectedPrice || this.state.selectedPayment || this.state.selectedProvince 
                    || this.props.selectedSpecialty || this.state.selectedClinic)
          ) 
        {
            const priceSelect    = this.builtDataInputSelectPrice(this.props.doctorPrice);
            const paymentSelect  = this.builtDataInputSelectPayment(this.props.doctorPayment);
            const provinceSelect = this.builtDataInputSelectProvince(this.props.doctorProvince);
            const specialtySelect = this.builtDataInputSelectSpecialty(this.props.specialty);
            const clinicSelect   = this.builtDataInputSelectClinic(this.props.clinic);

            const updatedSelectedPrice = this.state.selectedPrice
                ? priceSelect.find(item => item.value === this.state.selectedPrice.value)
                : '';
            const updatedSelectedPayment = this.state.selectedPayment
                ? paymentSelect.find(item => item.value === this.state.selectedPayment.value)
                : '';
            const updatedSelectedProvince = this.state.selectedProvince
                ? provinceSelect.find(item => item.value === this.state.selectedProvince.value)
                : '';
            const updatedSelectedSpecialty = this.state.selectedSpecialty
                ? specialtySelect.find(item => item.value === this.state.selectedSpecialty.value)
                : '';
            const updatedSelectedClinic = this.state.selectedClinic
                ? clinicSelect.find(item => item.value === this.state.selectedClinic.value)
                : '';

            this.setState({
                allPrice: priceSelect,
                allPayment: paymentSelect,
                allProvince: provinceSelect,
                specialty:    specialtySelect,
                selectedPrice: updatedSelectedPrice,
                selectedPayment: updatedSelectedPayment,
                selectedProvince: updatedSelectedProvince,
                selectedSpecialty: updatedSelectedSpecialty,
                selectedClinic:     updatedSelectedClinic
            });
        }
    }

    handleEditorChange = ({ html, text }) => {
       this.setState({
           contentHTML: html,
           contentMarkdown: text,
       })
    }

    handleSaveContentMarkdown = () => {
        const { hasOldData, contentHTML, contentMarkdown, description, selectedDoctor,
            selectedPrice,selectedPayment,selectedProvince,selectedSpecialty,selectedClinic,nameClinic,addressClinic,note } = this.state;

        this.props.saveDoctorStartAdmin({
            contentHTML,
            contentMarkdown,	
            description,
            doctorId: selectedDoctor.value,
            priceId: selectedPrice.value,
            paymentId: selectedPayment.value,
            provinceId: selectedProvince.value,
            specialtyId:selectedSpecialty.value,
            clinicId: selectedClinic.value,
            nameClinic,
            addressClinic,
            note,
            action: hasOldData ? adminActions.EDIT : adminActions.CREATE
        });
    }
    
    handleChange = async (selectedDoctor) => {
      this.setState({ 
        selectedDoctor
      } 
      );
      let res = await handleGetDoctorById(selectedDoctor.value);
      if(res && res.errCode === 0 && res.data && res.data.Markdown) {
        let markdown = res.data.Markdown;
        let doctor_infor = res.data.Doctor_infor; 

        if (markdown && doctor_infor) {
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                selectedPrice: this.state.allPrice.find(item => item.value === doctor_infor.priceId),
                selectedPayment: this.state.allPayment.find(item => item.value === doctor_infor.paymentId),
                selectedProvince: this.state.allProvince.find(item => item.value === doctor_infor.provinceId),
                selectedSpecialty: this.state.specialty.find(item => item.value === doctor_infor.specialtyId),
                selectedClinic: this.state.clinic.find(item => item.value === doctor_infor.clinicId),
                nameClinic: doctor_infor.nameClinic,
                addressClinic: doctor_infor.addressClinic,
                note: doctor_infor.note,
                hasOldData: true   
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                selectedPrice:'',
                selectedPayment:'',
                selectedProvince:'',
                selectedSpecialty:'',
                selectedClinic:'',
                nameClinic: '',
                addressClinic: '',
                note: '',
                hasOldData: false 
            });
        }
      } else if (res && res.errCode === 0 && res.data && !res.data.Markdown  && !res.data.Doctor_infor) {
        this.setState({
            contentHTML:'',
            contentMarkdown:'',
            description:'',
            selectedPrice:'',
            selectedPayment:'',
            selectedProvince:'',
            selectedSpecialty:'',
            selectedClinic:'',
            nameClinic: '',
            addressClinic: '',
            note: '',
         })
      }
    }

    handleChangePrice = async (selectedPrice) => {
      this.setState({ 
        selectedPrice
      } 
      );
    }

    handleChangePayment = async (selectedPayment) => {
      this.setState({ 
        selectedPayment
      } 
      );
    }

    handleChangeProvince = async (selectedProvince) => {
      this.setState({ 
        selectedProvince
      } 
      );
    }

    handleChangeSpecialty = async (selectedSpecialty) => {
      this.setState({ 
        selectedSpecialty
      } 
      );
    }

    handleChangeClinic = async (selectedClinic) => {
      this.setState({ 
        selectedClinic
      } 
      );
    }

    handleOnChangeDESC = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handleOnChangeText = (event,id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    render() {
        return (
        <div className='manage-doctor-container'>
        <div className='manage-doctor-title'>
            <FormattedMessage id="doctor.addinformation"/>
        </div>
        <div className='more-infor'>
            <div className='content-left form-group'>
               <label><FormattedMessage id="doctor.selectdoctor"/></label>
                <Select
                        value={this.state.selectedDoctor}
                        onChange={this.handleChange}
                        options={this.state.allDoctors}
                        placeholder={<FormattedMessage id="doctor.selectdoctor-placeholder"/>}
                    />
            </div>
            <div className='content-right form-group'>
               <label><FormattedMessage id="doctor.informationdoctor"/></label>
               <textarea className='form-control'  onChange={(event) => this.handleOnChangeDESC(event)} value={this.state.description}>
               </textarea>
            </div>
        </div>
        <div className='more-infor-extra'>
            <div className="row">
                <div className='col-4 form-group'>
                    <label><FormattedMessage id="doctor.selectprice"/></label>
                     <Select
                        value={this.state.selectedPrice}
                        onChange={this.handleChangePrice}
                        options={this.state.allPrice}
                        placeholder={<FormattedMessage id="doctor.selectprice-placeholder"/>}
                     />
                </div>
                <div className='col-4 form-group'>
                    <label><FormattedMessage id="doctor.selectpayment"/></label>
                     <Select
                        value={this.state.selectedPayment}
                        onChange={this.handleChangePayment}
                        options={this.state.allPayment}
                        placeholder={<FormattedMessage id="doctor.selectpayment-placeholder"/>}
                     />
                </div>
                <div className='col-4 form-group'>
                    <label><FormattedMessage id="doctor.selectprovince"/></label>
                     <Select
                        value={this.state.selectedProvince}
                        onChange={this.handleChangeProvince}
                        options={this.state.allProvince}
                        placeholder={<FormattedMessage id="doctor.selectprovince-placeholder"/>}
                     />
                </div>
           </div>
          
            <div className="row">
                <div className='col-4 form-group'>
                    <label><FormattedMessage id="doctor.selectspecialty"/></label>
                     <Select
                        value={this.state.selectedSpecialty}
                        onChange={this.handleChangeSpecialty}
                        options={this.state.specialty}
                        placeholder={<FormattedMessage id="doctor.selectspecialty-placeholder"/>}
                     />
                </div>
                <div className='col-4 form-group'>
                    <label><FormattedMessage id="doctor.selectclinic"/></label>
                     <Select
                        value={this.state.selectedClinic}
                        onChange={this.handleChangeClinic}
                        options={this.state.clinic}
                        placeholder={<FormattedMessage id="doctor.selectclinic-placeholder"/>}
                     />
                </div>
                <div className='col-4 form-group'>
                    <label><FormattedMessage id="doctor.nameclinic"/></label>
                    <input className='form-control' value={this.state.nameClinic} 
                    onChange={(event) => this.handleOnChangeText(event,'nameClinic')}
                    />
                </div>
           </div>

            <div className="row">
                <div className='col-4 form-group'>
                    <label><FormattedMessage id="doctor.addressclinic"/></label>
                    <input className='form-control' value={this.state.addressClinic} 
                     onChange={(event) => this.handleOnChangeText(event,'addressClinic')}
                     />
                </div>
                <div className='col-4 form-group'>
                    <label><FormattedMessage id="doctor.note"/></label>
                    <input className='form-control' value={this.state.note} 
                    onChange={(event) => this.handleOnChangeText(event,'note')}
                    />
                </div>

            </div>
           
        </div>
        <div className='manage-doctor-editor'>
           <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} 
                     onChange={this.handleEditorChange} value={this.state.contentMarkdown} />
        </div>
        <button className='save-content-doctor'
        onClick={() => this.handleSaveContentMarkdown()}
        >
         {this.state.hasOldData ? <FormattedMessage id="doctor.edit"/> : <FormattedMessage id="doctor.save"/>}
        </button>
        </div>
        )
    } 

}

const mapStateToProps = state => {
    return {
      language: state.app.language,
      allDoctors: state.admin.allDoctors,
      saveDoctorSuccess: state.admin.saveDoctorSuccess,
      doctorPrice: state.admin.doctorPrice,
      doctorPayment: state.admin.doctorPayment,
      doctorProvince: state.admin.doctorProvince,
      specialty: state.admin.specialty,
      clinic: state.admin.clinic,
      userInfo : state.user.userInfo   
    };
};

const mapDispatchToProps = dispatch => {
    return {
      fetchAllDoctorStartAdmin: (() => dispatch(actions.fetchAllDoctorStart())),
      saveDoctorStartAdmin: ((data) => dispatch(actions.saveDoctorStart(data))),
      resetDoctorSuccessAdmin: (() => dispatch(actions.resetDoctorSuccess())),
      fetchDoctorPriceStartAdmin: (() => dispatch(actions.fetchDoctorPriceStart())),
      fetchDoctorPaymentStartAdmin: (() => dispatch(actions.fetchDoctorPaymentStart())),
      fetchDoctorProvinceStartAdmin: (() => dispatch(actions.fetchDoctorProvinceStart())),
      fetchSpecialtyStartAdmin: (() => dispatch(actions.fetchSpecialtyStart())),
      fetchClinicStartAdmin: (() => dispatch(actions.fetchClinicStart())),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
