import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DefaultClass.scss";
import { FormattedMessage } from 'react-intl';

class DefaultClass extends Component {
    
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
          <div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
