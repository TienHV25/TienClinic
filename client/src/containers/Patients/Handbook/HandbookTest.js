import React, { Component } from 'react';
import { connect } from "react-redux";
import "./HandbookTest.scss";
import { getHandbookTestDetail } from '../../../services/userService';
import HomeHeader from '../../HomePage/HomeHeader';
import { withRouter } from 'react-router-dom';
import { push } from "connected-react-router";

class HandbookTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testDetail: null,
            selectedOption: null,
            currentQuestionIndex: 0,
            answers: {} 
        }
    }

    async componentDidMount() {
        let { match } = this.props;
        if (match && match.params && match.params.id) {
            let res = await getHandbookTestDetail(match.params.id);
            if (res && res.errCode === 0) {
                this.setState({
                    testDetail: res.data
                });
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentQuestionIndex !== this.state.currentQuestionIndex) {
            const { testDetail, currentQuestionIndex, answers } = this.state;
            if (testDetail && testDetail.questions) {
                const currentQuestion = testDetail.questions[currentQuestionIndex];
                const savedAnswer = answers[currentQuestion.id];
                this.setState({
                    selectedOption: savedAnswer || null
                });
            }
        }
    }

    handleOptionChange = (optionId) => {
        const { testDetail, currentQuestionIndex } = this.state;
        const currentQuestion = testDetail.questions[currentQuestionIndex];
        
        this.setState(prevState => ({
            selectedOption: optionId,
            answers: {
                ...prevState.answers,
                [currentQuestion.id]: optionId
            }
        }));
    }

    handleNextQuestion = () => {
        this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            selectedOption: null 
        }));
    }

    handlePreviousQuestion = () => {
        this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex - 1,
            selectedOption: null
        }));
    }

    calculateTotalScore = () => {
        const { answers, testDetail } = this.state;
        let totalScore = 0;
        
        if (!testDetail || !testDetail.questions) return 0;
        
       
        Object.keys(answers).forEach(questionId => {
            const selectedOptionId = answers[questionId];
            
           
            const question = testDetail.questions.find(q => q.id.toString() === questionId.toString());
            if (question) {
                
                const selectedOption = question.options.find(opt => opt.id.toString() === selectedOptionId.toString());
                if (selectedOption && selectedOption.score) {
                    totalScore += parseInt(selectedOption.score);
                }
            }
        });
        
        return totalScore;
    }

    handleFinishTest = () => {
        let totalScore = this.calculateTotalScore();
        this.props.history.push({
            pathname: "/handbook-test-result",
            state: { totalScore: totalScore ,
                    evaluationName: this.state.testDetail?.evaluationName
            }   
        });
    };

    render() {
        let { testDetail, selectedOption, currentQuestionIndex } = this.state;
        if (!testDetail || !testDetail.questions || testDetail.questions.length === 0) {
            return (
                <>
                    <HomeHeader />
                    <div className="handbook-test-container">
                        <p>Đang tải dữ liệu...</p>
                    </div>
                </>
            );
        }

        let totalQuestions = testDetail.questions.length;
        let currentQuestion = testDetail.questions[currentQuestionIndex];
        
        return (
            <>
                <HomeHeader />
                <div className="handbook-test-container">
                    <div className="test-content">
                        <div className="progress-bar">
                            <div className="progress-text">
                                {currentQuestionIndex + 1}/{totalQuestions}
                            </div>
                            <div className="progress-track">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="question-block">
                            <div className="question-title">
                                Đề mục {currentQuestionIndex + 1}: {currentQuestion.questionText}
                            </div>
                            <div className="options-list">
                                {currentQuestion.options.map(option => (
                                    <label key={option.id} className="option-item">
                                        <input
                                            type="radio"
                                            name={`question-${currentQuestion.id}`}
                                            value={option.id}
                                            checked={selectedOption && selectedOption.toString() === option.id.toString()}
                                            onChange={() => this.handleOptionChange(option.id)}
                                        />
                                        <span>{option.optionText}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="button-container">
                          
                            {currentQuestionIndex > 0 && (
                                <button
                                    className="prev-btn"
                                    onClick={this.handlePreviousQuestion}
                                >
                                    Trước đó
                                </button>
                            )}
                            
                            <div className="spacer"></div>
                            
                            {currentQuestionIndex < totalQuestions - 1 ? (
                                <button
                                    className="next-btn"
                                    disabled={!selectedOption}
                                    onClick={this.handleNextQuestion}
                                >
                                    Tiếp theo
                                </button>
                            ) : (
                                <button
                                    className="next-btn"
                                    disabled={!selectedOption}
                                    onClick={this.handleFinishTest}
                                >
                                    Hoàn thành
                                </button>
                            )}
                        </div>
                    </div>
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandbookTest));