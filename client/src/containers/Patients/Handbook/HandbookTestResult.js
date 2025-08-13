import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./HandbookTestResult.scss";
import HomeHeader from "../../HomePage/HomeHeader";

class HandbookTestResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalScore: 0,
            evaluation: ""
        };
    }

    componentDidMount() {
        let score = 0;
       
        if (this.props.match && this.props.match.params && this.props.match.params.score) {
            score = parseInt(this.props.match.params.score);
        }
       
        else if (this.props.location && this.props.location.state && this.props.location.state.totalScore) {
            score = this.props.location.state.totalScore;
        }

        this.setState({
            totalScore: score,
            evaluation: this.getEvaluation(score)
        });
    }

    getEvaluation = (score) => {
        if (score <= 5) return (`Bạn không có biểu hiện ${this.props.location.state.evaluationName}`);
        if (score <= 10) return (`Bạn có dấu hiệu ${this.props.location.state.evaluationName} nhẹ.`);
        if (score <= 15) return (`Bạn có dấu hiệu ${this.props.location.state.evaluationName} vừa phải`);
        return (`Bạn có dấu hiệu ${this.props.location.state.evaluationName} nặng, nên gặp chuyên gia tâm lý.`);
    };

    render() {
        let { totalScore, evaluation } = this.state;
        return (
            <>
                <HomeHeader />
                <div className="handbook-test-result-container">
                    <h2 className="result-title">Bạn đã hoàn thành bài test</h2>
                    <div className="result-box">
                        <div className="total-score">Tổng số điểm: <span>{totalScore}</span></div>
                        <div className="evaluation">{evaluation}</div>
                    </div>
                    <p className="note">
                        Kết quả bài test này chỉ mang tính chất tham khảo, không có giá trị thay thế chẩn đoán y khoa bởi bác sĩ/chuyên gia có chuyên môn.
                    </p>
                    <button className="download-btn" onClick={() => window.print()}>
                        📄 Tải file kết quả
                    </button>
                </div>
            </>
        );
    }
}

export default withRouter(HandbookTestResult);
