import React from 'react';
import { Button, Form, FormGroup, FormFeedback, Input, Label, Col } from 'reactstrap';

class LogIn extends React.Component {
    constructor(props) {
        super(props);

        this.handleSignInClick = this.handleSignInClick.bind(this);
        this.handleForgotPasswordClick = this.handleForgotPasswordClick.bind(this);

        this.state = {
            emailIsValid: undefined,
            passwordIsValid: undefined,
        }
    }

    handleSignInClick(e) {
        let inputEmail = document.getElementById('inputEmail');
        let inputPassword = document.getElementById('inputPassword');

        let validationSuccessful = true;

        if (inputEmail.value === '' || !(/\S+@\S+\.\S+/.test(inputEmail.value))) {
            this.setState({emailIsValid: false});
            validationSuccessful = false;
        } else {
            this.setState({emailIsValid: true});
        }
        if (inputPassword.value === '') {
            this.setState({passwordIsValid: false});
            validationSuccessful = false;
        } else {
            this.setState({passwordIsValid: true});
        }

        if (validationSuccessful) {
            //TODO: add api call
            let authSuccessful = true;

            this.props.onSignInClick(authSuccessful);
        }
        e.preventDefault();
    }

    handleForgotPasswordClick(e) {
        this.props.onForgotPasswordClick();
        e.preventDefault();
    }

    render() {
        return (
            <section className="Section-LogInSignUpForm">
                <Form className="LogInSignUpForm" id="LogInForm" noValidate>
                    <FormGroup>
                        <Label for="inputEmail" className="sr-only">Email address</Label>
                        <Input type="email" id="inputEmail" placeholder="Email address" name="email" valid={this.state.emailIsValid} required autoFocus />
                        <FormFeedback>Valid email is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="inputPassword" className="sr-only">Password</Label>
                        <Input type="password" id="inputPassword" placeholder="Password" name="password" valid={this.state.passwordIsValid} required />
                        <FormFeedback>Password is required</FormFeedback>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={6}>
                            <Button onClick={this.handleSignInClick} color="success" className="LogInSignUpFormSignInButton">Sign In</Button>
                        </Col>
                        <Col sm={6} className="LogInSignUpFormForgotPasswordContainer">
                            <Button onClick={this.handleForgotPasswordClick} className="btn-link LogInSignUpFormForgotPassword">Forgot your password?</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </section>
        );
    }
}

export default LogIn;