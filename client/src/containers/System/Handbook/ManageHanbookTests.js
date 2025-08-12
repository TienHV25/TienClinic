import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageHanbookTests.scss";
import { FormattedMessage } from 'react-intl';
import { createHandbookTest, getAllHandbookTests } from '../../../services/userService';
import { toast } from 'react-toastify';

class ManageHanbookTests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [
                {
                    questionText: '',
                    options: [
                        { optionText: '', score: 0 }
                    ]
                }
            ],
            listTests: [],
            title: '',
            description: ''
        }
    }

    async componentDidMount() {
        await this.fetchAllTests();
    }

    fetchAllTests = async () => {
        let res = await getAllHandbookTests();
        if (res && res.data) {
            this.setState({ listTests: res.data });
        }
    }

    handleOnChangeInput = (event, id) => {
        this.setState({
            [id]: event.target.value
        });
    }

    handleQuestionChange = (e, qIndex) => {
        let questions = [...this.state.questions];
        questions[qIndex].questionText = e.target.value;
        this.setState({ questions });
    }

    handleOptionChange = (e, qIndex, oIndex, field) => {
        let questions = [...this.state.questions];
        questions[qIndex].options[oIndex][field] =
            field === 'score' ? Number(e.target.value) : e.target.value;
        this.setState({ questions });
    }

    addQuestion = () => {
        this.setState(prev => ({
            questions: [...prev.questions, { questionText: '', options: [{ optionText: '', score: 0 }] }]
        }));
    }

    removeQuestion = (qIndex) => {
        let questions = [...this.state.questions];
        questions.splice(qIndex, 1);
        this.setState({ questions });
    }

    addOption = (qIndex) => {
        let questions = [...this.state.questions];
        questions[qIndex].options.push({ optionText: '', score: 0 });
        this.setState({ questions });
    }

    removeOption = (qIndex, oIndex) => {
        let questions = [...this.state.questions];
        questions[qIndex].options.splice(oIndex, 1);
        this.setState({ questions });
    }

    handleSaveNewhandbook = async () => {
        let payload = {
            title: this.state.title,
            description: this.state.description,
            questions: this.state.questions
        };
        let res = await createHandbookTest(payload);
        if (res && res.errCode === 0) {
            toast.success("Tạo bộ câu hỏi thành công!");
            this.setState({
                title: '',
                description: '',
                questions: [{ questionText: '', options: [{ optionText: '', score: 0 }] }]
            });
            await this.fetchAllTests();
        } else {
            toast.error("Tạo bộ câu hỏi thất bại!");
        }
    }

    render() {
        return (
            <div className='manage-handbook-container'>
                <div className='ms-title'><FormattedMessage id={"handbook.handbook_manage"} /></div>
                <div className='add-new-handbook row'>

                    <div className='col-6 form-group'>
                        <label>Tiêu đề Test:</label>
                        <input className='form-control' type='text' value={this.state.title}
                            onChange={(event) => this.handleOnChangeInput(event, 'title')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Mô tả:</label>
                        <input className='form-control' type='text' value={this.state.description}
                            onChange={(event) => this.handleOnChangeInput(event, 'description')}
                        />
                    </div>

                    <div className='col-12 mt-3'>
                        <h5>Danh sách câu hỏi</h5>
                        {this.state.questions.map((q, qIndex) => (
                            <div key={qIndex} className='question-block'>
                                <input
                                    type="text"
                                    placeholder={`Câu hỏi ${qIndex + 1}`}
                                    value={q.questionText}
                                    onChange={(e) => this.handleQuestionChange(e, qIndex)}
                                    className='form-control mb-2'
                                />
                                {q.options.map((opt, oIndex) => (
                                    <div key={oIndex} className='d-flex mb-2'>
                                        <input
                                            type="text"
                                            placeholder={`Đáp án ${oIndex + 1}`}
                                            value={opt.optionText}
                                            onChange={(e) => this.handleOptionChange(e, qIndex, oIndex, 'optionText')}
                                            className='form-control mr-2'
                                        />
                                        <input
                                            type="number"
                                            placeholder="Điểm"
                                            value={opt.score}
                                            onChange={(e) => this.handleOptionChange(e, qIndex, oIndex, 'score')}
                                            className='form-control mr-2'
                                        />
                                        <button onClick={() => this.removeOption(qIndex, oIndex)} className='btn btn-danger'>X</button>
                                    </div>
                                ))}
                                <div style={{display:'flex',gap:'5px'}}>
                                    <button onClick={() => this.addOption(qIndex)} className='btn btn-sm btn-primary mb-3'>+ Thêm đáp án</button>
                                    <button onClick={() => this.removeQuestion(qIndex)} className='btn btn-sm btn-warning mb-3'>Xóa câu hỏi</button>
                                </div>
                                <hr />
                            </div>
                        ))}
                        <button onClick={this.addQuestion} className='btn btn-success mt-2'>+ Thêm câu hỏi</button>
                    </div>

                    <div className='col-12'>
                        <button className='btn-save-handbook'
                            onClick={this.handleSaveNewhandbook}>
                            <FormattedMessage id={"handbook.save"} />
                        </button>
                    </div>
                </div>

                <div className='list-handbook-tests mt-4'>
                    <h5>Danh sách bài test cẩm nang </h5>
                    <ul>
                        {this.state.listTests && this.state.listTests.length > 0 &&
                            this.state.listTests.map((item, index) => (
                                <li key={index}>
                                    <strong>{item.title}</strong> - {item.description}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

export default connect(mapStateToProps)(ManageHanbookTests);
