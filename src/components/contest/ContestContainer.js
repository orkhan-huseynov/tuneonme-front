import React from 'react';
import ContestUsers from './ContestUsers';
import { Container, Row, Col } from 'reactstrap';

class ContestContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <ContestUsers/>
                    </Col>
                </Row>
                <Row>
                    <Col>

                    </Col>
                </Row>
            </Container>
        );
    }

}

export default ContestContainer;