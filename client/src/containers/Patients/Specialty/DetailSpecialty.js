import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';

class DetailSpecialty extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          
        }
    }

   
    componentDidMount() {
       
    }

    componentDidUpdate(prevProps) {
       
    }

    render() {
        
        return (
          <>
            <HomeHeader />
            <div>detail specialty</div>
          </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
