import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss';
import { FormattedMessage } from 'react-intl';

class About extends Component {
    render() {
        return (
            <div className='About-container'>
                <div className='About-contain'>
                    <span>
                        <FormattedMessage id="about.title"/>
                    </span>
                    <div className='About-contain-info'>
                        <div className="video-wrapper">
                            <iframe 
                                src="https://www.youtube.com/embed/j6iuGkKEqek"
                                title="Khám sức khỏe định kỳ có ý nghĩa như thế nào trong việc dự phòng bệnh tật?"
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin" 
                                allowFullScreen>
                            </iframe>
                        </div>
                        <span>
                            <FormattedMessage id="about.information"/>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);