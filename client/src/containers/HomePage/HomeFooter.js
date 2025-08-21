import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss';

class HomeFooter extends Component {
    render() {
        return (
          <div className='Footer-container'>
            <div className='Footer-contain'>
                <span>&copy; 2025 TienClinic.More Information,can visit another website.
                    <a target="blank" href='https://tien-tech4-u.vercel.app/'>
                        &#8594; Click here &#8592;
                    </a>
                </span>
            </div>
          </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
