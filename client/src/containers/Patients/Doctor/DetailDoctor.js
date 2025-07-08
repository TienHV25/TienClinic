import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailDoctor.scss";
import {handleGetDoctorById} from '../../../services/userService'



class DetailDoctor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {}
        }
    }

    async componentDidMount() {
       if(this.props.match && this.props.match.params && this.props.match.params.id) {
          let res = await handleGetDoctorById(this.props.match.params.id);
          if(res && res.errCode === 0){
             this.setState({
                detailDoctor: res.data
             })
          }
       }
    }

    componentDidUpdate(prevProps) {

    }


    render() {
        let { detailDoctor } = this.state;
        return (
            <React.Fragment>
              <HomeHeader isShowBanner = {false} />
              <div className='doctor-detail-container'>
                <div className='intro-doctor'>
                    <div className='content-left' style={{backgroundImage: `url(${detailDoctor?.image})`}}>
                            
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                           {this.props.language === 'vi' ? detailDoctor?.positionData?.valueVi : detailDoctor?.positionData?.valueEn} {detailDoctor?.lastName} {detailDoctor?.firstName}
                        </div>
                        <div className='down'>
                           {detailDoctor?.Markdown?.description}
                        </div>
                    </div>
                </div>
                <div className='schedule-doctor'>
                    
                </div>
                <div className='detail-info-doctor'>
                           <div dangerouslySetInnerHTML={{__html:  detailDoctor?.Markdown?.contentHTML}}>
                           </div>
                </div>
                <div className='comment-doctor'>
                    
                </div>
              </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
