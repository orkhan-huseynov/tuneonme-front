import React from 'react';
import LogIn from './LogIn';
import SignUp from './SignUp';
import SignUpSuccess from './SignUpSuccess';
import PasswordRecovery from './PasswordRecovery';

class LogInSignUp extends React.Component {
    constructor(props) {
        super(props);

        this.handleForgotPasswordClick = this.handleForgotPasswordClick.bind(this);
        this.handleAlreadyRegisteredClick = this.handleAlreadyRegisteredClick.bind(this);
        this.handleAlreadyRememberedClick = this.handleAlreadyRememberedClick.bind(this);
        this.handleSignInClick = this.handleSignInClick.bind(this);
        this.handleSignUpClick = this.handleSignUpClick.bind(this);
        this.handleTuneOnMeClick = this.handleTuneOnMeClick.bind(this);
    }

    handleForgotPasswordClick() {
        this.props.onForgotPasswordClick();
    }

    handleAlreadyRegisteredClick() {
        this.props.onAlreadyRegisteredClick();
    }

    handleAlreadyRememberedClick() {
        this.props.onAlreadyRememberedClick();
    }

    handleSignInClick(authSuccessful) {
        this.props.onSignedInClick(authSuccessful);
    }

    handleSignUpClick(signUpSuccessful) {
        this.props.onSignedUpClick(signUpSuccessful);
    }

    handleTuneOnMeClick() {
        this.props.onTuneOnMeClick();
    }

    render() {
        const displayMode = this.props.displayMode;

        if (displayMode === 'LogIn') {
            return (
                <LogIn onSignInClick={this.handleSignInClick} onForgotPasswordClick={this.handleForgotPasswordClick}></LogIn>
            );
        } else if (displayMode === 'SignUp') {
            return (
                <SignUp onSignUpClick={this.handleSignUpClick} onAlreadyRegisteredClick={this.handleAlreadyRegisteredClick}></SignUp>
            );
        } else if (displayMode === 'SignUpSuccess') {
            return (
                <SignUpSuccess onTuneOnMeClick={this.handleTuneOnMeClick}></SignUpSuccess>
            );
        } else if (displayMode === 'PasswordRecovery') {
            return (
                <PasswordRecovery onAlreadyRememberedClick={this.handleAlreadyRememberedClick}></PasswordRecovery>
            );
        }
    }
}

export default LogInSignUp;