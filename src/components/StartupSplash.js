import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import main_loader from '../images/main_loader.gif';

class StartupSplash extends React.Component {
    render() {
        return (
            <section className="Section-StartupSplash">
                <Container>
                    <Row>
                        <Col className="text-center">
                            <img src={main_loader} alt="spinner" />
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}

export default StartupSplash;