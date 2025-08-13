import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DetailHandbook.scss";
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import {getHandbookDetail} from '../../../services/userService';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtralnfor from '../Doctor/DoctorExtralnfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { withRouter } from 'react-router-dom';
import * as actions from "../../../store/actions";
import Select from 'react-select';

class DetailHandbook extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
           handbook:{},
        }
    }
    
    fetchHandbookOfDetail = async (id) => {
        let res = await getHandbookDetail(id);
        this.setState({
            handbook:res.data
        })   
    };

    componentDidMount() {
       this.fetchHandbookOfDetail(this.props.match.params.id);
    };

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.fetchHandbookOfDetail(this.props.match.params.id);
        }
    };

 
    render() {
        let {handbook} = this.state;
        return (
          <>
            <HomeHeader />
            <div className='detail-handbook-container'>
                <div className='detail-handbook-infor'>
                   <div dangerouslySetInnerHTML={{__html:  handbook?.descriptionHTML}}>
                    </div>
                </div>
                <div className="start-btn-container">
                    <button className="start-btn" onClick={() => this.props.history.push(`/handbook-test/${handbook?.testId}`)}>
                        BẮT ĐẦU
                    </button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailHandbook));
