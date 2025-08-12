import React, { Component } from 'react';
import { connect } from "react-redux";
import "./AllClinic.scss";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { getAllClinic } from '../../../services/userService';

const { Buffer } = require('buffer');

class AllClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinics: []
        }
    }

    async componentDidMount() {
        try {
            let res = await getAllClinic(1000);
            if (res && res.errCode === 0) {
                this.setState({ clinics: res.data || [] });
            }
        } catch (error) {
            console.error("Failed to fetch clinics:", error);
        }
    }

    handleViewDetailclinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`);
        }
    }

    render() {
        let { clinics } = this.state;

        return (
            <div className="all-clinic-container">
                <div className="breadcrumb">
                    <span onClick={() => this.props.history.push('/')}>
                        <FormattedMessage id="homeheader.homepage"/>
                    </span>
                    &nbsp;/&nbsp;
                    <FormattedMessage id="clinic.clinic" />
                </div>

                <h2 className="title">
                    <FormattedMessage id="clinic.clinic"/>
                </h2>

                <div className="clinic-list">
                    {clinics && clinics.length > 0 &&
                        clinics.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="clinic-item"
                                    onClick={() => this.handleViewDetailclinic(item)}
                                >
                                    <div className="clinic-img" ><img src={item.image} alt='Clinic cardiovascular'/></div>
                                    <div className="clinic-name">
                                        {item.name}
                                    </div>
                                </div>
                            );
                        })
                    }
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

export default withRouter(connect(mapStateToProps)(AllClinic));
