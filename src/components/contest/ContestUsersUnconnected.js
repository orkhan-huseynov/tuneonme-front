import React from 'react';
import { Button, Container, Row, Col, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import UserSmall from './UserSmall';
import vs_icon from '../../images/vs_icon.png';

class ContestUsersUnconnected extends React.Component {
    // constructor(props){
    //     super(props);
    //
    // }

    componentDidMount() {
        //TODO add api call

    }

    render() {
        return (
            <Container className="Container-contest-users">
                <Row>
                    <Col>
                        <InputGroup className="InputGroup-member-search">
                            <Input placeholder="id or name"/>
                            <InputGroupAddon className="input-group-append" addonType="prepend">
                                <span className="input-group-text">
                                    <Button className="btn-link btn-no-border btn-no-padding"><i className="fa fa-search" aria-hidden="true"></i></Button>
                                </span>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                    <Col>
                        <img className="IMG-vs-icon" src={vs_icon} alt="vs" />
                    </Col>
                    <Col>
                        <UserSmall userId={this.props.userId}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ContestUsersUnconnected;