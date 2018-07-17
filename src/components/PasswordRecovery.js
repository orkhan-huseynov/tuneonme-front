import React from 'react';
import { Button, Form, FormGroup, FormFeedback, Input, Label, Col } from 'reactstrap';

class PasswordRecovery extends React.Component {
    constructor(props) {
        super(props);

        this.handleAlreadyRememberedClick = this.handleAlreadyRememberedClick.bind(this);
        this.handleResetPasswordClick = this.handleResetPasswordClick.bind(this);

        this.state = {
            emailIsValid: undefined,
        }
    }

    handleAlreadyRememberedClick(e) {
        this.props.onAlreadyRememberedClick();
        e.preventDefault();
    }

    handleResetPasswordClick(e) {
        let inputEmail = document.getElementById('inputEmail');

        let validationSuccessful = true;

        if (inputEmail.value === '' || !(/\S+@\S+\.\S+/.test(inputEmail.value))) {
            this.setState({emailIsValid: false});
            validationSuccessful = false;
        } else {
            this.setState({emailIsValid: true});
        }

        if (validationSuccessful) {
            //TODO add api call


        }

        //this.props.handleResetPasswordClick();
        e.preventDefault();
    }

    render() {
        return (
            <section className="Section-LogInSignUpForm">
                <Form className="LogInSignUpForm" noValidate>
                    <FormGroup>
                        <Label for="inputEmail" className="sr-only">Email address</Label>
                        <Input type="email" id="inputEmail" placeholder="Email address" name="email" valid={this.state.emailIsValid} required />
                        <FormFeedback>Valid email is required</FormFeedback>
                    </FormGroup>

                    <FormGroup row>
                        <Col sm={6}>
                            <Button onClick={this.handleResetPasswordClick} color="success" className="LogInSignUpFormResetPasswordButton">Recover</Button>
                        </Col>
                        <Col sm={6} className="LogInSignUpFormAlreadyRememberedContainer">
                            <button onClick={this.handleAlreadyRememberedClick} className="btn-link LogInSignUpFormAlreadyRemembered">Already remembered?</button>
                        </Col>
                    </FormGroup>
                </Form>
            </section>
        );
    }
}

export default PasswordRecovery;