import React from 'react';
import { Button } from 'reactstrap';
import default_profile from '../images/default_profile.png';

class UserSmall extends React.Component {
    constructor(props) {
        super(props);

        this.handleProfileImageClick = this.handleProfileImageClick.bind(this);
        this.handleNameLastNameClick = this.handleNameLastNameClick.bind(this);

        this.state = {
            profile_image: undefined,
            profile_name: undefined,
            profile_last_name: undefined,
            profile_id: undefined,
        };
    }

    componentDidMount() {
        //TODO add api call
        //const user_id = this.props.userId;

        this.setState({
            profile_image: default_profile,
            profile_name: 'Name',
            profile_last_name: 'LastName',
            profile_id: 'TM000001',
        });
    }

    handleProfileImageClick(e) {
        this.props.handleUserClick();
        e.preventDefault();
    }

    handleNameLastNameClick(e) {
        this.props.handleUserClick();
        e.preventDefault();
    }

    render() {
        return (
            <article className="Article-user-profile">
                <a href="" onClick={this.handleProfileImageClick}>
                    <div style={{backgroundImage: `url("${this.state.profile_image}")`}} className="img-circle thumb-image-small"></div>
                </a>
                <p>
                    <Button onClick={this.handleNameLastNameClick} className="btn-link btn-no-border">{this.state.profile_name}&nbsp;{this.state.profile_last_name}</Button>
                </p>
                <p>
                    Id: <span className="Span-profile-id">{this.state.profile_id}</span>
                </p>

            </article>
        );
    }
}

export default UserSmall;