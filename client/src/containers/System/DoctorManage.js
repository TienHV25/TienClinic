import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./DoctorManage.scss";
import * as actions from "../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';


const mdParser = new MarkdownIt();

class DoctorManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentHTML:'',
            contentMarkdown:'',
            selectedDoctor:'',
            description: '',
            allDoctors: []
        }
    }

    componentDidMount() {
       this.props.fetchAllDoctorStartAdmin();
    }

    builtDataInputSelect = (inputData) => {
        let result = [];
        if(inputData && inputData.length > 0) {
            inputData.map((item,index) => {
                let object = {};

                object.label = `${item.lastName} ${item.firstName}`;
                object.value = item.id;
                result.push(object);
            })
        }

        return result;

    }

    componentDidUpdate(prevProps) {
        if(prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.builtDataInputSelect(this.props.allDoctors);
            this.setState({
                allDoctors: dataSelect
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
       this.setState({
           contentHTML: html,
           contentMarkdown: text,
       })
    }

    handleSaveContentMarkdown = () => {
        this.props.saveDoctorStartAdmin({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,	
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value
        });
    }
    
    handleChange = (selectedDoctor) => {
      this.setState({ 
        selectedDoctor
      } 
      )
    }

    handleOnChangeDESC = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        return (
        <div className='manage-doctor-container'>
        <div className='manage-doctor-title'>
            <FormattedMessage id="doctor.addinformation"/>
        </div>
        <div className='more-infor'>
            <div className='content-left form-group'>
               <label><FormattedMessage id="doctor.selectdoctor"/></label>
               <Select
                    value={this.state.selectedDoctor}
                    onChange={this.handleChange}
                    options={this.state.allDoctors}
                />
            </div>
            <div className='content-right form-group'>
               <label><FormattedMessage id="doctor.informationdoctor"/></label>
               <textarea className='form-control' rows='4' onChange={(event) => this.handleOnChangeDESC(event)} value={this.state.description}>

               </textarea>
            </div>
        </div>
        <div className='manage-doctor-editor'>
           <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
        </div>
        <button className='save-content-doctor'
        onClick={() => this.handleSaveContentMarkdown()}
        >
            <FormattedMessage id="doctor.save"/>
        </button>
        </div>
        )
    } 

}

const mapStateToProps = state => {
    return {
      allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
      fetchAllDoctorStartAdmin: (() => dispatch(actions.fetchAllDoctorStart())),
      saveDoctorStartAdmin: ((data) => dispatch(actions.saveDoctorStart(data)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
