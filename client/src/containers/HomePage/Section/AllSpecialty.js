import React, { Component } from 'react';
import { connect } from "react-redux";
import "./AllSpecialty.scss";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { getAllSpecialty } from '../../../services/userService';

const { Buffer } = require('buffer');

class AllSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialties: []
        }
    }

    async componentDidMount() {
        try {
            let res = await getAllSpecialty(1000);
            if (res && res.errCode === 0) {
                this.setState({ specialties: res.data || [] });
            }
        } catch (error) {
            console.error("Failed to fetch specialties:", error);
        }
    }

    handleViewDetailSpecialty = (specialty) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${specialty.id}`);
        }
    }

    render() {
        let { specialties } = this.state;

        return (
            <div className="all-specialty-container">
                <div className="breadcrumb">
                    <span onClick={() => this.props.history.push('/')}>
                        <FormattedMessage id="homeheader.homepage"/>
                    </span>
                    &nbsp;/&nbsp;
                    <FormattedMessage id="specialty.specialty" />
                </div>

                <h2 className="title">
                    <FormattedMessage id="specialty.specialty"/>
                </h2>

                <div className="specialty-list">
                    {specialties && specialties.length > 0 &&
                        specialties.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="specialty-item"
                                    onClick={() => this.handleViewDetailSpecialty(item)}
                                >
                                    <div
                                        className="specialty-img"
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    ></div>
                                    <div className="specialty-name">
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

export default withRouter(connect(mapStateToProps)(AllSpecialty));
