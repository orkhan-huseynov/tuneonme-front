import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import LevelButton from './LevelButton';

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
                            <LevelButton status="passed" name="Flaws"></LevelButton>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <div>
                            <LevelButton status="passed" name="Achievments"></LevelButton>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <div>
                            <LevelButton status="passed" name="Weirdnesses"></LevelButton>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <div>
                            <LevelButton status="passed" name="Talents"></LevelButton>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <div>
                            <LevelButton status="active" name="Fears"></LevelButton>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <div>
                            <LevelButton status="inactive" name="Lies"></LevelButton>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <div>
                            <LevelButton status="new" name="+"></LevelButton>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default ContestLevels;