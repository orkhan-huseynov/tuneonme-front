import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import UserSmall from './UserSmall';
import vs_icon from '../images/vs_icon.png';

class ContestUsersConnected extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <Container className="Container-contest-users">
                <Row>
                    <Col>
                        <UserSmall userId={this.props.friendUserId} />
                    </Col>
                    <Col>
                        <img className="IMG-vs-icon" src={vs_icon} alt="vs" />
                    </Col>
                    <Col>
                        <UserSmall userId={this.props.userId} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ContestUsersConnected;