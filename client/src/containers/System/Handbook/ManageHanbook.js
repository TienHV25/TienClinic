import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageHanbook.scss";
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import {CommonUtils} from "../../../utils";
import {createHandbook} from '../../../services/userService';
import {  toast } from 'react-toastify';
import * as actions from "../../../store/actions";
import Select from 'react-select';

const mdParser = new MarkdownIt();


class ManageHanbook extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML:'',
            descriptionMarkdown:'',
            testId : '',
            selectedTest: '',
            allTest: []
        }
    }

    builtDataInputSelectTest = (inputData) => {
    let result = [];
    if(inputData && inputData.length > 0) {
        inputData.map((item,index) => {
            let object = {};

            object.label = item.title;
            object.value = item.id;
            result.push(object);
        })
    }

    return result;
    }

    componentDidMount() {
        this.props.fetchTestsStartAdmin();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.tests !== this.props.tests ||
            prevProps.language !== this.props.language) {
            let testSelect = this.builtDataInputSelectTest(this.props.tests);
                this.setState({
                    allTest: testSelect
                });
        }
        if(
                prevProps.language !== this.props.language &&
                (this.state.selectedTest)
          ) 
        {
            const testSelect    = this.builtDataInputSelectPrice(this.props.tests);
          
            const updatedSelectedTest = this.state.selectedTest
                ? testSelect.find(item => item.value === this.state.selectedTest.value)
                : '';

            this.setState({
                allTest: updatedSelectedTest,
            });
        }
    }

    handleOnChangeInput = (event,id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
           ...stateCopy
        })

    }

    handleEditorChange = ({ html, text }) => {
       this.setState({
           descriptionHTML: html,
           descriptionMarkdown: text,
       })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })

        }
    }

    handleSaveNewHandbook = async () => {
        let res = await createHandbook({
            name: this.state.name,
            descriptionMarkdown: this.state.descriptionMarkdown,
            descriptionHTML: this.state.descriptionHTML,
            image:  this.state.imageBase64,
            testId: this.state.selectedTest.value
        })
        if(res && res.errCode === 0){
           toast.success("Add new Handbook succedd !");
           if(this.imageInput) this.imageInput.value = null;
           this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                selectedTest: '',
            });
        }else{
           toast.error("Add new Handbook failed !");
        }
    }

    handleChangeTest = async (selectedTest) => {
      this.setState({ 
        selectedTest,
        
      } 
      );
    }

    render() {
        return (
          <div className='manage-Handbook-container'>
            <div className='ms-title'><FormattedMessage id={"handbook.handbook_manage"} /></div>
            <div className='add-new-Handbook row'>
                 <div className='col-6 form-group'>
                    <label><FormattedMessage id={"handbook.handbook_name"} />:</label>
                    <input className='form-control' type='text' value={this.state.name}
                        onChange={(event) => this.handleOnChangeInput(event,'name')}
                    />
                 </div>
                 <div className='col-6 form-group'>
                    <label><FormattedMessage id={"handbook.handbook_image"} />:</label>
                    <input ref={el => this.imageInput = el} className='form-control-file' type='file'
                        onChange={(event) => this.handleOnChangeImage(event)}
                     />
                 </div>
                <div className='col-6 form-group'>
                    <label><FormattedMessage id={"handbook.handbook_test"} />:</label>
                    <Select
                        value={this.state.selectedTest}
                        onChange={this.handleChangeTest}
                        options={this.state.allTest}
                        placeholder={<FormattedMessage id="handbook.selecttest-placeholder"/>}
                    />
                 </div>
                 <div className='col-12'>
                    <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} value={this.state.descriptionMarkdown} />
                </div>
                <div className='col-12'>
                    <button className='btn-save-Handbook'
                        onClick={() => this.handleSaveNewHandbook()}>
                        <FormattedMessage id={"handbook.save"} />
                    </button>
                </div>
            </div>
           
          </div>
            )
        }
    }

const mapStateToProps = state => {
    return {
        language: state.app.language,
        tests: state.admin.tests,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTestsStartAdmin: (() => dispatch(actions.fetchTestsStart())),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHanbook);
