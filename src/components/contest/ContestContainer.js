import React from 'react';
import ContestUsers from './ContestUsers';
import Profile from './Profile';
import { Container, Row, Col } from 'reactstrap';
import Contest from './Contest';

class ContestContainer extends React.Component {

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
        switch (this.props.displayMode) {
            case 'contest':
                return (
                    <Container>
                        <Row>
                            <Col>
                                <ContestUsers
                                    user={this.props.user}
                                    onUserProfileClick={this.handleUserProfileClick}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Contest/>
                            </Col>
                        </Row>
                    </Container>
                );
            case 'profile':
                return (
                    <Container>
                        <Row>
                            <Col>
                                <Profile user={this.props.user} />
                            </Col>
                        </Row>
                    </Container>
                );
            default:
                return false;
        }

    }

}

export default ContestContainer;