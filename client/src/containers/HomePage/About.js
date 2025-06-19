import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss';

class About extends Component {
    render() {
        return (
          <div className='About-container'>
            <div className='About-contain'>
                <span>Tại sao nên khám sức khỏe định kỳ ?</span>
                <div className='About-contain-info'>
                    <iframe width="930" height="523" src="https://www.youtube.com/embed/j6iuGkKEqek" 
                    title="Khám sức khỏe định kỳ có ý nghĩa như thế nào trong việc dự phòng bệnh tật?" 
                    frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    <span>"Khám sức khỏe định kỳ giúp phát hiện sớm các bệnh lý tiềm ẩn, từ đó điều trị kịp thời và hiệu quả. 
                        Đồng thời, đây cũng là cách bảo vệ sức khỏe chủ động, tiết kiệm chi phí và nâng cao chất lượng cuộc sống."
                    </span>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
