import React from 'react';
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Button, Form, FormFeedback, FormGroup } from 'reactstrap';
import Moment from 'react-moment';
import profilePicturePlaceholder from '../../images/default_profile.png';
import selectPhotoIcon from '../../images/select_photo.svg';
import config from '../../config';

// adapters
import profileAdapter from '../../adapters/profileAdapter';

// icons
import { FaPencilAlt, FaCheck } from 'react-icons/fa';

class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.handleSelectProfilePicture = this.handleSelectProfilePicture.bind(this);
        this.handleInputFileChange = this.handleInputFileChange.bind(this);
        this.handleEditName = this.handleEditName.bind(this);
        this.handleSaveName = this.handleSaveName.bind(this);

        this.inputOpenFileRef = React.createRef()

        this.state = {
            profilePicture: undefined,
            profilePictureSrc: selectPhotoIcon,
            isUploadingProfilePicture: false,
            isEditingName: false,
            inputProfileNameIsValid: undefined,
            isSavingProfileName: false,
            totalLevels: undefined,
            levelsWon: undefined,
        }
    }


    handleSelectProfilePicture(e) {
        e.preventDefault();
        this.inputOpenFileRef.current.click()
    }

    handleInputFileChange(e) {
        e.stopPropagation();
        e.preventDefault();

        this.uploadProfilePicture(e.target.files[0]);
    }

    handleEditName(e) {
        e.preventDefault();

        this.setState({isEditingName: true});
    }

    handleSaveName(e) {
        e.preventDefault();

        const inputProfileName = document.getElementById('inputProfileName');

        let validationSuccessful = true;
        let nameLastnameArr;

        if (inputProfileName.value === '') {
            this.setState({inputProfileNameIsValid: false});
            validationSuccessful = false;
        } else {
            nameLastnameArr = inputProfileName.value.split(' ');

            if (nameLastnameArr === undefined || nameLastnameArr.length !== 2) {
                this.setState({inputProfileNameIsValid: false});
                validationSuccessful = false;
            } else {
                this.setState({inputProfileNameIsValid: true});
            }
        }

        if (validationSuccessful) {
            this.setState({isSavingProfileName: true});

            profileAdapter.saveProfileNameLastname({
                name: nameLastnameArr[0],
                lastname: nameLastnameArr[1],
            })
                .then(saveSuccessfull => {
                    if (saveSuccessfull !== false) {
                        this.props.user.name = nameLastnameArr[0];
                        this.props.user.lastname = nameLastnameArr[1];

                        this.setState({isEditingName: false});
                    } else {
                        console.log('Error saving profile name') // TODO: show user-friendly error
                    }
                })
                .catch(() => console.log('Error saving profile name')) // TODO: show user-friendly error
                .finally(() => this.setState({isSavingProfileName: false}));
        }
    }

    uploadProfilePicture(profilePictureFile) {
        const formData = new FormData();
        formData.append('profilePicture', profilePictureFile);

        this.setState({isUploadingProfilePicture: true});

        profileAdapter.storeProfilePicture(formData)
            .then(uploadedFileName => {
                if (uploadedFileName !== false) {
                    this.props.user.profilePicture = uploadedFileName;
                    this.setState({ profilePictureSrc: uploadedFileName });
                } else {
                    // TODO: show user-friendly error
                    console.log('Error saving profile picture');
                }
            })
            .catch(() => console.log('Error saving profile picture')) // TODO: show user-friendly error
            .finally(() => this.setState({isUploadingProfilePicture: false}));
    }

    componentDidMount() {
        profileAdapter.getLevelsStats()
            .then(responseResult => {
                if (responseResult !== false) {
                    this.setState({
                        totalLevels: responseResult.totalLevels,
                        levelsWon: responseResult.levelsWon,
                    })
                } else {
                    console.log('Somthing went wrong');
                }
            })
            .catch(() => {
                console.log('Something went wrong');
            });

    }

    render() {
        let profilePicture = profilePicturePlaceholder;
        if (this.props.user.profilePicture !== null) {
            profilePicture = config.storagePath + this.props.user.profilePicture;
        }

        const memberSince = new Date(this.props.user.memberSince * 1000);

        let profileNameComponent;

        if (this.state.isEditingName) {
            profileNameComponent =
                <div className="profile-user-edit-name-surname-container">
                    <Form method="post" noValidate>
                        <FormGroup>
                            <InputGroup>
                                <Input id="inputProfileName" className="profile-user-name-input" name="inputProfileName" placeholder="Profile name"
                                       defaultValue={this.props.user.name + ' ' + this.props.user.lastname}
                                       valid={this.state.inputProfileNameIsValid === true}
                                       invalid={this.state.inputProfileNameIsValid === false}
                                       required autoFocus
                                       disabled={this.state.isSavingProfileName === true}
                                />
                                <InputGroupAddon addonType="append">
                                    <Button color="success"
                                            onClick={this.handleSaveName}
                                            disabled={this.state.isSavingProfileName === true}
                                    >
                                        <FaCheck/>
                                    </Button>
                                </InputGroupAddon>
                                <FormFeedback>Profile name is invalid!</FormFeedback>
                            </InputGroup>

                        </FormGroup>
                    </Form>
                </div>
        } else {
            profileNameComponent =
                <div>
                    <h2 className="profile-user-name">{this.props.user.name} {this.props.user.lastname}</h2>
                    <a href="" className="fa-username-edit" onClick={this.handleEditName}><FaPencilAlt/></a>
                </div>
        }

        return (
            <Container className="Container-profile">
                <Row>
                    <Col className="text-center">
                        <div className={ this.state.isUploadingProfilePicture ? 'spin_loader profile_pic_container' : 'profile_pic_container' }>
                            <div style={{backgroundImage: `url('${profilePicture}')`}} className="img-circle thumb-image-large"></div>
                        </div>
                        <a href="" onClick={this.handleSelectProfilePicture} className="select-photo-icon">
                            <img src={selectPhotoIcon} alt="Select profile picture" />
                        </a>
                        <input ref={this.inputOpenFileRef} onChange={this.handleInputFileChange} type="file" style={{display:"none"}}/>
                        <Row className="profile-user-details">
                            <Col xs={{ size: '8', offset: 2 }}>
                                { profileNameComponent }
                            </Col>
                        </Row>
                        <p className="profile-bio">Member since: <Moment format="MMM DD, YYYY">{memberSince.toISOString()}</Moment></p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ size: '6'}}>
                        <div className="levels_count">
                            <p className="levels_count_number">{this.state.totalLevels}</p>
                            <p className="levels_count_text">Levels Completed</p>
                        </div>
                    </Col>
                    <Col xs={{ size: '6'}}>
                        <div className="levels_count">
                            <p className="levels_count_number">{this.state.levelsWon}</p>
                            <p className="levels_count_text">Levels Won</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default Profile;
