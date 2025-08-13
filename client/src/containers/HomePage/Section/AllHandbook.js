import React, { Component } from 'react';
import { connect } from "react-redux";
import "./AllHandbook.scss";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { getAllHandbook } from '../../../services/userService';

const { Buffer } = require('buffer');

class AllHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handbooks: []
        }
    }

    async componentDidMount() {
        try {
            let res = await getAllHandbook(1000);
            if (res && res.errCode === 0) {
                this.setState({ handbooks: res.data || [] });
            }
        } catch (error) {
            console.error("Failed to fetch handbooks:", error);
        }
    }

    handleViewDetailHandbook = (item) => {
      if (this.props.history) {
        this.props.history.push(`/detail-handbook/${item.id}`);
      }
    }

    render() {
        let { handbooks } = this.state;

        return (
            <div className="all-handbook-container">
                <div className="breadcrumb">
                    <span onClick={() => this.props.history.push('/')}>
                        <FormattedMessage id="homeheader.homepage"/>
                    </span>
                    &nbsp;/&nbsp;
                    <FormattedMessage id="handbook.handbook" />
                </div>

                <h2 className="title">
                    <FormattedMessage id="handbook.handbook"/>
                </h2>

                <div className="handbook-list">
                    {handbooks && handbooks.length > 0 &&
                        handbooks.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="handbook-item"
                                    onClick={() => this.handleViewDetailHandbook(item)}
                                >
                                    <div
                                        className="handbook-img"
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    ></div>
                                    <div className="handbook-name">
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

export default withRouter(connect(mapStateToProps)(AllHandbook));
