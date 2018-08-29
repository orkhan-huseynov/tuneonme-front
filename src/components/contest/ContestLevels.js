import React from 'react';
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Button, Form, FormFeedback, FormGroup } from 'reactstrap';
import Moment from 'react-moment';
import profilePicturePlaceholder from '../../images/default_profile.png';

// adapters

// icons

class ContestLevels extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Container>
                <Row>
                    <Col className="text-center">
                        <div>
                            <Button className="contest_level_btn">Flaws</Button>{' '}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <div>
                            <Button className="contest_level_btn">Achievments</Button>{' '}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <div>
                            <Button className="contest_level_btn">Weirdnesses</Button>{' '}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <div>
                            <Button className="contest_level_btn">Talents</Button>{' '}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <div>
                            <Button className="contest_level_btn">Fears</Button>{' '}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <div>
                            <Button className="contest_level_btn_active">Lies</Button>{' '}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <div>
                            <Button className="contest_level_btn_new">+</Button>{' '}
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default ContestLevels;