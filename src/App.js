import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LogInSignUp from './components/LogInSignUp';
import ContestUsers from './components/ContestUsers';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.handleSignUpClick = this.handleSignUpClick.bind(this);
        this.handleForgotPasswordClick = this.handleForgotPasswordClick.bind(this);
        this.handleAlreadyRegisteredClick = this.handleAlreadyRegisteredClick.bind(this);
        this.handleAlreadyRememberedClick = this.handleAlreadyRememberedClick.bind(this);
        this.handleSignedInClick = this.handleSignedInClick.bind(this);
        this.handleSignedUpClick = this.handleSignedUpClick.bind(this);
        this.handleSignOutClick = this.handleSignOutClick.bind(this);
        this.handleTuneOnMeClick = this.handleTuneOnMeClick.bind(this);

        this.state = {
            isLoggedIn: false,
            logInSignUpComponentDisplayMode: 'LogIn',
        };
    }

    handleSignUpClick() {
        this.setState({logInSignUpComponentDisplayMode: 'SignUp'});
    }

    handleForgotPasswordClick() {
        this.setState({logInSignUpComponentDisplayMode: 'PasswordRecovery'});
    }

    handleAlreadyRegisteredClick() {
        this.setState({logInSignUpComponentDisplayMode: 'LogIn'});
    }

    handleAlreadyRememberedClick() {
        this.setState({logInSignUpComponentDisplayMode: 'LogIn'});
    }

    handleSignedInClick(authSuccessful) {
        if (authSuccessful) {
            this.setState({isLoggedIn: true});
        }
    }

    handleSignedUpClick(signUpSuccessful) {
        if (signUpSuccessful) {
            this.setState({logInSignUpComponentDisplayMode: 'SignUpSuccess'});
        }
    }

    handleSignOutClick() {
        this.setState({isLoggedIn: false});
    }

    handleTuneOnMeClick() {
        this.setState({logInSignUpComponentDisplayMode: 'LogIn'});
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        const logInSignUpComponentDisplayMode = this.state.logInSignUpComponentDisplayMode;

        let mainContainer = null;

        if (!isLoggedIn) {
            mainContainer = <LogInSignUp displayMode={logInSignUpComponentDisplayMode}
                                         onAlreadyRegisteredClick={this.handleAlreadyRegisteredClick}
                                         onAlreadyRememberedClick={this.handleAlreadyRememberedClick}
                                         onForgotPasswordClick={this.handleForgotPasswordClick}
                                         onSignedInClick={this.handleSignedInClick}
                                         onSignedUpClick={this.handleSignedUpClick}
                                         onTuneOnMeClick={this.handleTuneOnMeClick}
                            />
        } else {
            mainContainer = <ContestUsers/>
        }

        return (
            <div className="App">
                <Header isLoggedIn={isLoggedIn}
                        onSignUpClick={this.handleSignUpClick}
                        onSignOutClick={this.handleSignOutClick} />

                {mainContainer}

                <Footer />
            </div>
        );
    }
}

export default App;
