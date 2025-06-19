import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import Clinic from './Section/Clinic';
import Doctor from './Section/Doctor';
import Handlebook from './Section/Handlebook';
import About from './About';
import HomeFooter from './HomeFooter';


class HomePage extends Component {

    render() {
       
        return (
           <div>
             <HomeHeader/>
             <Specialty/>
             <Clinic/>
             <Doctor/>
             <Handlebook/>
             <About/>
             <HomeFooter/>
           </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
