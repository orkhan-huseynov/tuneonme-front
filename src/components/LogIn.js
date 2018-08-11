import React from 'react';
import { Button, Form, FormGroup, FormFeedback, Input, Label, Col, Alert } from 'reactstrap';

// adapters
import AuthAdapter from '../adapters/authAdapter';

class LogIn extends React.Component {

    constructor(props) {
        super(props);

        this.handleSignInClick = this.handleSignInClick.bind(this);
        this.handleForgotPasswordClick = this.handleForgotPasswordClick.bind(this);

        this.state = {
            emailIsValid: undefined,
            passwordIsValid: undefined,
            logInFailed: undefined,
            isLoading: undefined,
        }
    }

    handleSignInClick(e) {
        e.preventDefault();

        const inputEmail = document.getElementById('inputEmail');
        const inputPassword = document.getElementById('inputPassword');

        let validationSuccessful = true;
        this.setState({logInFailed: undefined});

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
            this.setState({isLoading: true});
            // API call
            AuthAdapter.getToken(inputEmail.value, inputPassword.value)
                .then(() => {
                    this.setState({logInFailed: false});
                    this.props.onSignInClick(true);
                })
                .catch(() => this.setState({
                    logInFailed: true,
                    isLoading: false,
                }));
        }

    }

    handleForgotPasswordClick(e) {
        this.props.onForgotPasswordClick();
        e.preventDefault();
    }

    render() {
        return (
            <section className="Section-LogInSignUpForm">
                <Form className="LogInSignUpForm" id="LogInForm" noValidate>
                    {(this.state.logInFailed === true) ?
                        <Alert color="danger" className="text-center">
                            Nope. Those are not correct <span role="img" aria-label="thinking face">🤔</span> Please try to remember and give it another shot!
                        </Alert>
                        : ''
                    }
                    <FormGroup>
                        <Label for="inputEmail" className="sr-only">Email address</Label>
                        <Input type="email" id="inputEmail" placeholder="Email address" name="email"
                               valid={this.state.emailIsValid === true}
                               invalid={this.state.emailIsValid === false}
                               required autoFocus />
                        <FormFeedback>We need your real email address</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="inputPassword" className="sr-only">Password</Label>
                        <Input type="password" id="inputPassword" placeholder="Password" name="password"
                               valid={this.state.passwordIsValid === true}
                               invalid={this.state.passwordIsValid === false}
                               required />
                        <FormFeedback>...and please give us your password <span role="img" aria-label="smiling face with sunglasses">😎</span></FormFeedback>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={6}>
                            <Button disabled={this.state.isLoading} onClick={this.handleSignInClick} color="success" className="LogInSignUpFormSignInButton">Sign In</Button>
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