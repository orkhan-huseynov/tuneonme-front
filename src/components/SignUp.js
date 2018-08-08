import React from 'react';
import { Button, Form, FormGroup, FormFeedback, Input, Label, Col } from 'reactstrap';

//adapters
import profileadapter from '../adapters/profileAdapter';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.handleEmailBlur = this.handleEmailBlur.bind(this);
        this.handleSignUpClick = this.handleSignUpClick.bind(this);
        this.handleAlreadyRegisteredClick = this.handleAlreadyRegisteredClick.bind(this);

        this.state = {
            nameIsValid: undefined,
            lastNameIsValid: undefined,
            emailIsValid: undefined,
            emailExists: undefined,
            passwordIsValid: undefined,
            confirmPasswordIsValid: undefined,
        }
    }

    handleEmailBlur(e) {
        const inputEmail = document.getElementById('inputEmail');
        if (inputEmail.value !== '') {
            profileadapter.checkEmailExists({
                email: inputEmail.value,
            }, emailExists => {
                this.setState({emailExists: emailExists, emailIsValid: !emailExists});
            }, error => {
                console.log(`Error chacking email existence (${error.response})`);
            });
        } else {
            this.setState({emailExists: false});
        }
    }

    handleSignUpClick(e) {
        const inputName = document.getElementById('inputName');
        const inputLastName = document.getElementById('inputLastName');
        const inputEmail = document.getElementById('inputEmail');
        const inputPassword = document.getElementById('inputPassword');
        const inputConfirmPassword = document.getElementById('inputConfirmPassword');

        let validationSuccessful = true;

        if (inputName.value === '') {
            this.setState({nameIsValid: false});
            validationSuccessful = false;
        } else {
            this.setState({nameIsValid: true});
        }

        if (inputLastName.value === '') {
            this.setState({lastNameIsValid: false});
            validationSuccessful = false;
        } else {
            this.setState({lastNameIsValid: true});
        }

        if (!this.state.emailExists) {
            if (inputEmail.value === '' || !(/\S+@\S+\.\S+/.test(inputEmail.value))) {
                this.setState({emailIsValid: false});
                validationSuccessful = false;
            } else {
                this.setState({emailIsValid: true});
            }
        }

        if (inputPassword.value === '') {
            this.setState({passwordIsValid: false});
            validationSuccessful = false;
        } else {
            this.setState({passwordIsValid: true});
        }

        if (inputConfirmPassword.value === '' || inputConfirmPassword.value !== inputPassword.value) {
            this.setState({confirmPasswordIsValid: false});
            validationSuccessful = false;
        } else {
            this.setState({confirmPasswordIsValid: true});
        }

        if (validationSuccessful) {
            //TODO: add api call
            let signUpSuccessful = true;

            this.props.onSignUpClick(signUpSuccessful);
        }
        e.preventDefault();
    }

    handleAlreadyRegisteredClick(e) {
        this.props.onAlreadyRegisteredClick();
        e.preventDefault();
    }

    render() {
        return (
            <section className="Section-LogInSignUpForm">
                <Form className="LogInSignUpForm" noValidate>
                    <FormGroup>
                        <Label for="inputName" className="sr-only">Name</Label>
                        <Input type="text" id="inputName" placeholder="Name" name="name"
                               valid={this.state.nameIsValid === true}
                               invalid={this.state.nameIsValid === false}
                               required autoFocus
                        />
                        <FormFeedback>Please enter your name</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="inputLastName" className="sr-only">Last name</Label>
                        <Input type="text" id="inputLastName" placeholder="Last name" name="lastName"
                               valid={this.state.lastNameIsValid === true}
                               invalid={this.state.lastNameIsValid === false}
                               required
                        />
                        <FormFeedback>Please enter your last name</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="inputEmail" className="sr-only">Email address</Label>
                        <Input type="email" id="inputEmail" placeholder="Email address" name="email"
                               valid={this.state.emailIsValid === true}
                               invalid={this.state.emailIsValid === false}
                               required
                               onBlur={this.handleEmailBlur}
                        />
                        <FormFeedback>{ this.state.emailExists ? 'Email already exists' : 'Please enter a valid email' }</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="inputPassword" className="sr-only">Password</Label>
                        <Input type="password" id="inputPassword" placeholder="Password" name="password"
                               valid={this.state.passwordIsValid === true}
                               invalid={this.state.passwordIsValid === false}
                               required
                        />
                        <FormFeedback>Password is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="inputConfirmPassword" className="sr-only">Confirm password</Label>
                        <Input type="password" id="inputConfirmPassword" placeholder="Confirm password"
                               name="passwordConfirmation"
                               valid={this.state.confirmPasswordIsValid === true}
                               invalid={this.state.passwordIsValid === false}
                               required
                        />
                        <FormFeedback>Password confirmation is required</FormFeedback>
                    </FormGroup>

                    <FormGroup row>
                        <Col sm={6}>
                            <Button onClick={this.handleSignUpClick} color="success" className="LogInSignUpFormSignUpButton">Sign Up</Button>
                        </Col>
                        <Col sm={6} className="LogInSignUpFormAlreadyRegisteredContainer">
                            <Button onClick={this.handleAlreadyRegisteredClick} className="btn-link LogInSignUpFormAlreadyRegistered">Already registered?</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </section>
        );
    }
}

export default SignUp;