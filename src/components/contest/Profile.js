import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import profilePicturePlaceholder from '../../images/default_profile.png';
import selectPhotoIcon from '../../images/select_photo.svg';

class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.handleSelectProfilePicture = this.handleSelectProfilePicture.bind(this);
        this.handleInputFileChange = this.handleInputFileChange.bind(this);

        this.inputOpenFileRef = React.createRef()

        this.state = {
            profilePicture: undefined,
        }
    }


    handleSelectProfilePicture(e) {
        e.preventDefault();
        this.inputOpenFileRef.current.click()
    }

    handleInputFileChange(e) {
        e.stopPropagation();
        e.preventDefault();
        const file = e.target.files[0];
        console.log(file);
        this.setState({profilePictureFile: file});
    }

    uploadProfilePicture() {
        const form = new FormData();
        form.append('file', this.state.file);

        //YourAjaxLib.doUpload('/yourEndpoint/',form).then(result=> console.log(result));
    }

    render() {
        let profilePicture = profilePicturePlaceholder;
        if (this.props.user.profilePicture !== null) {
            profilePicture = this.props.user.profilePicture;
        }

        const memberSince = new Date(this.props.user.memberSince * 1000);

        return (
            <Container className="Container-profile">
                <Row>
                    <Col className="text-center">
                        <div style={{backgroundImage: `url('${profilePicture}')`}} className="img-circle thumb-image-large"></div>
                        <a href="" onClick={this.handleSelectProfilePicture} className="select-photo-icon">
                            <img src={selectPhotoIcon} alt="Select profile picture" />
                        </a>
                        <input ref={this.inputOpenFileRef} onChange={this.handleInputFileChange} type="file" style={{display:"none"}}/>
                        <h2 className="profile-user-name">{this.props.user.name} {this.props.user.lastname}</h2>
                        <p className="profile-bio">Member since: <Moment format="MMM DD, YYYY">{memberSince.toISOString()}</Moment></p>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default Profile;
