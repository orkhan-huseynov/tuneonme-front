import React from 'react';
import ContestUsersConnected from './ContestUsersConnected';
import ContestUsersUnconnected from './ContestUsersUnconnected';

class ContestUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: 0,
            friendUserId: 0,
            isConnected: false,
        }
    }

    componentDidMount() {
        //TODO add api call
    }

    render() {
        const isConnected = this.state.isConnected;

        if (isConnected) {
            return (
                <ContestUsersConnected userId={this.state.userId} />
            );
        } else {
            return (
                <ContestUsersUnconnected userId={this.state.userId} friendUserId={this.state.friendUserId} />
            );
        }
    }
}

export default ContestUsers;