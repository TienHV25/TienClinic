import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DoctorExtralnfor.scss";
import { FormattedMessage } from 'react-intl';
import { getExtraInforDoctorById } from '../../../services/userService';


class DoctorExtralnfor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
           isShowDetailInfor: false,
           priceId: '',
           paymentId:'',
           nameClinic: '',
           addressClinic: '',
           note: ''
        }
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
    
    handleGetExtraInfor = async () => {
         let res = await getExtraInforDoctorById(this.props.doctorID);
            if(res && res.errCode === 0) {
                this.setState({
                    priceId: res.data.priceIdData ? 
                        (this.props.language === 'vi' ? res.data.priceIdData.valueVi : res.data.priceIdData.valueEn) 
                        : '',
                    paymentId: res.data.paymentIdData ? 
                        (this.props.language === 'vi' ? res.data.paymentIdData.valueVi : res.data.paymentIdData.valueEn)
                        : '',
                    nameClinic: res.data.nameClinic || '',
                    addressClinic: res.data.addressClinic || '',
                    note: res.data.note || ''
                })
            }
    }

    componentDidMount() {
       this.handleGetExtraInfor();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.language !== this.props.language) {
           this.handleGetExtraInfor();
        }
    }

    render() {
        let {isShowDetailInfor} = this.state;
        const formattedPrice = this.formatPrice(this.state.priceId);
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id="doctor.address-title" /></div>
                    <div className='name-clinic'>{this.state.nameClinic}</div>
                    <div className='detail-address'>{this.state.addressClinic}</div>
                </div>
                <div className='content-down'>
                    {!isShowDetailInfor ? (
                        <div className='show-infor'>
                            <span className='price-text-show'><FormattedMessage id="doctor.examination-price" /> {formattedPrice}</span>
                            <span className='show-infor-text' onClick={() => this.setState({ isShowDetailInfor: true })}>
                                 <FormattedMessage id="doctor.view-detail" /></span> 
                        </div>
                    ) : (
                        <div className='hide-infor'>
                            <span className='price-text-hide'><FormattedMessage id="doctor.examination-price" /></span>
                            <div className='hide-infor-background'>
                                <div className='hide-infor-price'>
                                    <div className='price-detail'>
                                        <span><FormattedMessage id="doctor.examination-price-label" /></span>
                                        <span>{formattedPrice}</span>
                                    </div>
                                    <div className='note'>{this.state.note}</div>
                                </div>
                                <div className='payment-methods'>
                                    <FormattedMessage id="doctor.payment-methods-text" /> {this.state.paymentId}
                                </div>
                            </div>
                            <div className='hide-infor-text' onClick={() => this.setState({ isShowDetailInfor: false })}>
                                <FormattedMessage id="doctor.hide-price" />
                            </div>
                        </div>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtralnfor);
