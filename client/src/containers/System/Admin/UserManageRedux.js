import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './UserManageRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import * as actions from "../../../store/actions";
import TableUser from './TableUser';


class UserManageRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
           genderArr: [],
           positionArr: [],
           roleArr:[],
           previewImgURL:'',
           isOpen: false,
           
           email: '',
           password: '',
           firstName: '',
           lastName: '',
           phonenumber: '',
           address: '',
           gender: '',
           position: '',
           role: '',
           avatar: ''
        }
    }

    componentDidMount() {
        this.props.fetchGenderStartAdmin();
        this.props.fetchPositionStartAdmin();
        this.props.fetchRoleStartAdmin();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.genders !== this.props.genders) {
            let gender = this.props.language === 'vi' ? this.props.genders[0].valueVi : this.props.genders[0].valueEn
            this.setState({
                genderArr:this.props.genders,
                gender: this.props.genders.length > 0 ? gender : ''
            })
        }
        if(prevProps.positions !== this.props.positions) {
            let position = this.props.language === 'vi' ? this.props.positions[0].valueVi : this.props.positions[0].valueEn
            this.setState({
                positionArr:this.props.positions,
                position: this.props.positions.length > 0 ? position : ''
            })
        }
        if(prevProps.roleIDs !== this.props.roleIDs) {
            let role = this.props.language === 'vi' ? this.props.roleIDs[0].valueVi : this.props.roleIDs[0].valueEn
            this.setState({
                roleArr:this.props.roleIDs,
                role: this.props.roleIDs.length > 0 ? role  : ''
            })
        }
        if(prevProps.users !== this.props.users) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: ''
            })
        }
    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl
            })

        }
    }

    handleOpenImage = () => {
        this.setState({
            isOpen: true
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        const arr =  ['email','password','firstName','lastName','phonenumber','address'];
        for(let i = 0; i < arr.length; i++) {
            if(!this.state[arr[i]]) {
                isValid = false;
                alert(`Missing parameter input for ${arr[i]}`);
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event) => {
        let {id,value} = event.target;
        this.setState(prevState => ({
           ...prevState,
           [id]: value
        }))
    }

    handleSaveUser = (data) => {
        let checkValidate = this.checkValidateInput();
        if(checkValidate === true) {
            this.props.createUserStartAdmin(data);
        }
    }
 
    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roleIDs = this.state.roleArr;

        let { email, password, firstName, lastName, 
            phonenumber, address, gender, position, role } = this.state;

        return (
            <div className='users-redux-container'>
               <div className='users-redux-content'>
                  <div className='title text-center'>Manage users redux</div>
                  <div className='users-redux-body'>
                    <div className='container'>
                          <div className='row'>
                            <form className="w-100">
                                <div className="form-row row my-2">
                                    <div className="form-group col-md-3">
                                        <FormattedMessage id="manage-user.add"/>
                                    </div>
                                </div>
                                <div className="form-row row my-2">
                                    <div className="form-group col-md-3">
                                    <label><FormattedMessage id="manage-user.email"/></label>
                                    <input type="email" className="form-control" id="email"
                                    value={email} onChange={(event) => this.onChangeInput(event)}/>
                                    </div>

                                    <div className="form-group col-md-3">
                                    <label><FormattedMessage id="manage-user.password"/></label>
                                    <input type="password" className="form-control" id="password"
                                    value={password} onChange={(event) => this.onChangeInput(event)}/>
                                    </div>

                                    <div className="form-group col-md-3">
                                    <label><FormattedMessage id="manage-user.first_name"/></label>
                                    <input type="text" className="form-control" id="firstName"
                                    value={firstName} onChange={(event) => this.onChangeInput(event)}/>
                                    </div>

                                    <div className="form-group col-md-3">
                                    <label><FormattedMessage id="manage-user.last_name"/></label>
                                    <input type="text" className="form-control" id="lastName"
                                    value={lastName} onChange={(event) => this.onChangeInput(event)}/>
                                    </div>
                                </div>

                                <div className='form-row row my-2'>
                                    <div className="form-group col-md-3">
                                    <label><FormattedMessage id="manage-user.phonenumber"/></label>
                                    <input type="text" className="form-control" id="phonenumber"
                                    value={phonenumber} onChange={(event) => this.onChangeInput(event)}/>
                                    </div>

                                    <div className="form-group col-md-9">
                                    <label><FormattedMessage id="manage-user.address"/></label>
                                    <input type="text" className="form-control" id="address"
                                    value={address} onChange={(event) => this.onChangeInput(event)}/>
                                    </div>
                                </div>

                                <div className='form-row row my-2'>
                                    <div className="form-group col-md-3">
                                    <label><FormattedMessage id="manage-user.gender"/></label>
                                    <select className='form-control' id="gender" value={gender} onChange={(event) => this.onChangeInput(event)}>
                                        {genders && genders.length > 0 && genders.map((item,index) => {
                                            return (
                                              <option key={index} value={item.keyMap}>{this.props.language === 'vi' ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                        }
                                    </select>
                                    </div>

                                    <div className="form-group col-md-3">
                                    <label><FormattedMessage id="manage-user.position"/></label>
                                    <select className='form-control' id="position" value={position} onChange={(event) => this.onChangeInput(event)}>
                                        {positions && positions.length > 0 && positions.map((item,index) => {
                                            return (
                                            <option key={index} value={item.keyMap}>{this.props.language === 'vi' ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                        }
                                        </select>
                                    </div>

                                    <div className="form-group col-md-3">
                                    <label><FormattedMessage id="manage-user.roleid"/></label>
                                    <select className='form-control' id="role" value={role} onChange={(event) => this.onChangeInput(event)}>
                                        {roleIDs && roleIDs.length > 0 && roleIDs.map((item,index) => {
                                            return (
                                            <option key={index} value={item.keyMap}>{this.props.language === 'vi' ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                        }
                                        </select>
                                    </div>

                                    <div className="form-group col-md-3 preview-image-container">
                                      <label><FormattedMessage id="manage-user.avatar"/></label>
                                      <div>
                                        <input type="file" id="previewImg" hidden onChange={(event) => this.handleOnChangeImage(event)}/>
                                        <label className='label-upload' htmlFor='previewImg'><FormattedMessage id="manage-user.upload"/><i className='fas fa-upload'></i></label>
                                        <div className='preview-image' 
                                        onClick={this.handleOpenImage}
                                        style={{backgroundImage: `url(${this.state.previewImgURL})`}}></div>
                                      </div>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary mt-2"  onClick={(e) => {
                                 e.preventDefault();
                                 this.handleSaveUser(this.state);
                                }}><FormattedMessage id="manage-user.save"/></button>

                                <div className='form-row row my-2'>
                                 <div className="form-group col-md-12">
                                    <TableUser />
                                 </div>
                                </div>
                            </form>
                        </div>
                    </div>
                  </div>
               </div>

               {this.state.isOpen === true &&
               <Lightbox
                    mainSrc={this.state.previewImgURL}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        positions: state.admin.positions,
        roleIDs: state.admin.roleIDs,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
   return {
        fetchGenderStartAdmin: (() => dispatch(actions.fetchGenderStart())),
        fetchPositionStartAdmin: (() => dispatch(actions.fetchPositionStart())),
        fetchRoleStartAdmin: (() => dispatch(actions.fetchRoleStart())),
        createUserStartAdmin: ((data) => dispatch(actions.createUserStart(data))),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageRedux);
