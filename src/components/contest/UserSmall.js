import React from 'react';
import { Button } from 'reactstrap';
import default_profile from '../../images/default_profile.png';

class UserSmall extends React.Component {
    constructor(props) {
        super(props);

        this.handleProfileImageClick = this.handleProfileImageClick.bind(this);
        this.handleNameLastNameClick = this.handleNameLastNameClick.bind(this);

        this.state = {

        };
    }

    handleProfileImageClick(e) {
        e.preventDefault();
        this.props.onUserClick();
    }

    handleNameLastNameClick() {
        this.props.onUserClick();
    }

    render() {
        const user = this.props.user;
        return (
            <article className="Article-user-profile">
                <a href="" onClick={this.handleProfileImageClick}>
                    <div style={{backgroundImage: `url("${this.state.profile_image}")`}} className="img-circle thumb-image-small"></div>
                </a>
                <p>
                    <Button onClick={this.handleNameLastNameClick} className="btn-link btn-no-border">{user.name}&nbsp;{user.lastname}</Button>
                </p>
                <p>
                    Id: <span className="Span-profile-id">{user.personalId}</span>
                </p>

            </article>
        );
    }
}

export default UserSmall;