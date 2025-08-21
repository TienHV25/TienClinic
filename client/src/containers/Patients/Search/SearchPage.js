import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./SearchPage.scss";
import {
  getAllClinic,
  getAllHandbook,
  getAllSpecialty,
  handleGetTopDoctorHome,
} from "../../../services/userService";
import HomeHeader from "../../HomePage/HomeHeader";
import { injectIntl } from 'react-intl';
import { FormattedMessage } from 'react-intl';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      selectedCategory: "all",
      specialties: [],
      doctors: [],
      clinics: [],
      handbooks: [],
    };
  }

  async componentDidMount() {
    await this.loadData();
  }

  loadData = async () => {
    const { keyword, selectedCategory } = this.state;

    let specialtyRes = [],
        doctorRes = [],
        clinicRes = [],
        handbookRes = [];

    if (selectedCategory === "all" || selectedCategory === "specialty") {
      specialtyRes = await getAllSpecialty(
        selectedCategory === "all" ? 5 : null,
        keyword
      );
    }
    if (selectedCategory === "all" || selectedCategory === "doctor") {
      doctorRes = await handleGetTopDoctorHome(
        selectedCategory === "all" ? 5 : null,
        keyword
      );
    }
    if (selectedCategory === "all" || selectedCategory === "clinic") {
      clinicRes = await getAllClinic(
        selectedCategory === "all" ? 5 : null,
        keyword
      );
    }
    if (selectedCategory === "all" || selectedCategory === "handbook") {
      handbookRes = await getAllHandbook(
        selectedCategory === "all" ? 5 : null,
        keyword
      );
    }

    this.setState({
      specialties: specialtyRes?.data || [],
      doctors: doctorRes?.data || [],
      clinics: clinicRes?.data || [],
      handbooks: handbookRes?.data || [],
    });
  };

  handleCategoryChange = async (e) => {
    await this.setState({ selectedCategory: e.target.value });
    this.loadData();
  };

  handleSearchInputChange = (e) => {
    this.setState({ keyword: e.target.value });
  };

  handleSearch = () => {
    this.loadData();
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.loadData();
    }
  };

  handleNavigate = (id, type) => {
    let route = "";
    switch (type) {
      case "doctor":
        route = `/detail-doctor/${id}`;
        break;
      case "specialty":
        route = `/detail-specialty/${id}`;
        break;
      case "clinic":
        route = `/detail-clinic/${id}`;
        break;
      case "handbook":
        route = `/detail-handbook/${id}`;
        break;
      default:
        break;
    }
    this.props.history.push(route);
  };

  renderSection = (title, data, type) => {
    if (!data || data.length === 0) return null;
    return (
      <div className="section">
        <div className="section-title">{title}</div>
        <div className="section-list">
          {data.map((item, index) => (
            <div
              key={index}
              className="section-item"
              onClick={() => this.handleNavigate(item.id, type)}
            >
              {item.image && (
                <img src={item.image} alt={item.name || item.firstName} />
              )}
              <span>{item.name || `${item.lastName} ${item.firstName}`}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  render() {
    const {
      keyword,
      selectedCategory,
      specialties,
      doctors,
      clinics,
      handbooks,
    } = this.state;
    let { intl } = this.props;

    return (
      <>
        <HomeHeader />
        <div className="search-page">
          <div className="search-bar">
            <div className="search-input">
              <i className="fas fa-search" onClick={this.handleSearch}></i>
              <input
                type="text"
                value={keyword}
                placeholder={
                  selectedCategory === "all"
                    ? intl.formatMessage({ id: "homeheader.all-search" })
                    : selectedCategory === "specialty"
                    ? intl.formatMessage({ id: "homeheader.specialty-search" })
                    : selectedCategory === "doctor"
                    ? intl.formatMessage({ id: "homeheader.doctor-search" })
                    : selectedCategory === "clinic"
                    ? intl.formatMessage({ id: "homeheader.clinic-search" })
                    : intl.formatMessage({ id: "homeheader.handbook-search" })
                }
                onChange={this.handleSearchInputChange}
                onKeyPress={this.handleKeyPress}
              />
            </div>
            <select
              value={selectedCategory}
              onChange={this.handleCategoryChange}
            >
              <option value="all">{intl.formatMessage({ id: "homeheader.all-search" })}</option>
              <option value="specialty">{intl.formatMessage({ id: "homeheader.specialty-search" })}</option>
              <option value="doctor">{intl.formatMessage({ id: "homeheader.doctor-search" })}</option>
              <option value="clinic">{intl.formatMessage({ id: "homeheader.clinic-search" })}</option>
              <option value="handbook">{intl.formatMessage({ id: "homeheader.handbook-search" })}</option>
            </select>
          </div>

          <div className="search-result">
            {selectedCategory === "all" && (
              <>
                {this.renderSection(<FormattedMessage id="specialty.specialty"/>, specialties, "specialty")}
                {this.renderSection(<FormattedMessage id="doctor.title"/>, doctors, "doctor")}
                {this.renderSection(<FormattedMessage id="clinic.clinic"/>, clinics, "clinic")}
                {this.renderSection(<FormattedMessage id="handbook.handbook"/>, handbooks, "handbook")}
              </>
            )}

            {selectedCategory === "specialty" &&
              this.renderSection(<FormattedMessage id="specialty.specialty"/>, specialties, "specialty")}
            {selectedCategory === "doctor" &&
              this.renderSection(<FormattedMessage id="doctor.title"/>, doctors, "doctor")}
            {selectedCategory === "clinic" &&
              this.renderSection(<FormattedMessage id="clinic.clinic"/>, clinics, "clinic")}
            {selectedCategory === "handbook" &&
              this.renderSection(<FormattedMessage id="handbook.handbook"/>, handbooks, "handbook")}
          </div>
        </div>
      </>
    );
  }
}

export default injectIntl(connect()(withRouter(SearchPage)));
