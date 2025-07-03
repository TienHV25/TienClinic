import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './UserManageRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import * as actions from "../../../store/actions";
import TableUser from './TableUser';
import {adminActions,CommonUtils} from "../../../utils";


class UserManageRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
           genderArr: [],
           positionArr: [],
           roleArr:[],
           previewImgURL:'',
           isOpen: false,
           
           id: '',
           email: '',
           password: '',
           firstName: '',
           lastName: '',
           phonenumber: '',
           address: '',
           gender: '',
           position: '',
           role: '',
           avatar: '',

           adminAction: adminActions.CREATE
        }
    }

    componentDidMount() {
        this.props.fetchGenderStartAdmin();
        this.props.fetchPositionStartAdmin();
        this.props.fetchRoleStartAdmin();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.genders !== this.props.genders) {
            const defaultGender = this.props.genders?.[0]?.keyMap || '';
            this.setState({
                genderArr: this.props.genders,
                gender: defaultGender,
            });
        }

        if (prevProps.positions !== this.props.positions) {
            const defaultPosition = this.props.positions?.[0]?.keyMap || '';
            this.setState({
                positionArr: this.props.positions,
                position: defaultPosition,
            });
        }

        if (prevProps.roleIDs !== this.props.roleIDs) {
            const defaultRole = this.props.roleIDs?.[0]?.keyMap || '';
            this.setState({
                roleArr: this.props.roleIDs,
                role: defaultRole,
            });
        }

        if (
            prevProps.users !== this.props.users &&
            this.props.genders.length > 0 &&
            this.props.positions.length > 0 &&
            this.props.roleIDs.length > 0
        ) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: '',
                gender: this.props.genders[0].keyMap,
                position: this.props.positions[0].keyMap,
                role: this.props.roleIDs[0].keyMap,
                previewImgURL: '',

                adminAction: adminActions.CREATE
            });
        }
    }


    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
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
        if(this.state.adminAction === adminActions.CREATE) 
        {
        const arr =  ['email','password','firstName','lastName','phonenumber','address'];
        for(let i = 0; i < arr.length; i++) {
            if(!this.state[arr[i]]) {
                isValid = false;
                alert(`Missing parameter input for ${arr[i]}`);
                break;
            }
        }
        }
        if(this.state.adminAction === adminActions.EDIT) 
        {
        const arr =  ['email','firstName','lastName','phonenumber','address'];
        for(let i = 0; i < arr.length; i++) {
            if(!this.state[arr[i]]) {
                isValid = false;
                alert(`Missing parameter input for ${arr[i]}`);
                break;
            }
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
     if(this.state.adminAction === adminActions.CREATE)
     {
        let checkValidate = this.checkValidateInput();
        if(checkValidate === true) {
            this.props.createUserStartAdmin(data);
        }
     }
    if(this.state.adminAction === adminActions.EDIT) 
    {
        let checkValidate = this.checkValidateInput();
        if(checkValidate === true) {
            this.props.updateUserStartAdmin(data);
        }
    }
    }

    handleShowUserEdit = (user) => {
        let  imageBase64 = '';
        if(user.image)
        {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            id: user.id,
            email: user.email,
            password: '',
            firstName: user.firstName,
            lastName: user.lastName,
            phonenumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionID,
            role: user.roleID,
            avatar: user.avatar,
            previewImgURL:imageBase64,

            adminAction: adminActions.EDIT
        });
    }
 
    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roleIDs = this.state.roleArr;

        let {  email, password, firstName, lastName, 
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
                                        <FormattedMessage id={this.state.adminAction === adminActions.CREATE ? "manage-user.add" : "manage-user.edit"}/>
                                    </div>
                                </div>
                                <div className="form-row row my-2">
                                    <div className="form-group col-md-3">
                                    <label><FormattedMessage id="manage-user.email"/></label>
                                    <input type="email" className="form-control" id="email" disabled={this.state.adminAction === adminActions.CREATE ? false : true}
                                    value={email} onChange={(event) => this.onChangeInput(event)}/>
                                    </div>

                                    <div className="form-group col-md-3">
                                    <label><FormattedMessage id="manage-user.password"/></label>
                                    <input type="password" className="form-control" id="password" disabled={this.state.adminAction === adminActions.CREATE ? false : true}
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

                                <button type="submit" className={this.state.adminAction === adminActions.CREATE ? "btn btn-primary mt-2" : "btn btn-warning mt-2"}  onClick={(e) => {
                                 e.preventDefault(); 
                                 this.handleSaveUser(this.state);
                                }}><FormattedMessage id={this.state.adminAction === adminActions.CREATE ? "manage-user.save" : "manage-user.save_change"}/></button>

                                <div className='form-row row my-2'>
                                 <div className="form-group col-md-12">
                                    <TableUser 
                                     handleShowUserEdit = {this.handleShowUserEdit}
                                     />
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
        updateUserStartAdmin: ((data) => dispatch(actions.updateUserStart(data))),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageRedux);
