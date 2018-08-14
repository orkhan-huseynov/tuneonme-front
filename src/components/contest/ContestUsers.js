import React from 'react';
import ContestUsersConnected from './ContestUsersConnected';
import ContestUsersUnconnected from './ContestUsersUnconnected';

class ContestUsers extends React.Component {
    constructor(props) {
        super(props);

        this.handleUserProfileClick = this.handleUserProfileClick.bind(this);

        this.state = {

        };
    }

    handleUserProfileClick() {
        this.props.onUserProfileClick();
    }

    render() {
        const user = this.props.user;

        if (user.hasActiveConnections) {
            return (
                <ContestUsersConnected user={user} />
            );
        } else {
            return (
                <ContestUsersUnconnected user={user} onUserProfileClick={this.handleUserProfileClick} />
            );
        }
    }
}

export default ContestUsers;