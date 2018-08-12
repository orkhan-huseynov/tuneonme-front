import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StartupSplash from './components/StartupSplash';
import LogInSignUp from './components/auth/LogInSignUp';
import ContestUsers from './components/ContestUsers';
import './App.css';

// adapters
import authAdapter from './adapters/authAdapter';

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
            isCheckingStoredToken: true,
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
            this.setState({
                logInSignUpComponentDisplayMode: 'SignUpSuccess',
                isLoggedIn: true,
            });
        }
    }

    handleSignOutClick() {
        this.setState({isLoggedIn: false});
    }

    handleTuneOnMeClick() {
        this.setState({logInSignUpComponentDisplayMode: 'LogIn'});
    }

    componentDidMount() {
        // check existing token and update state
        authAdapter.checkToken()
            .then(tokenIsValid => this.setState({'isLoggedIn': tokenIsValid}))
            .catch(() => {this.setState({'isLoggedIn': false})})
            .finally(() => this.setState({'isCheckingStoredToken': false}));
    }

    render() {
        let mainContainer = null;

        if (this.state.isCheckingStoredToken) {
            mainContainer = <StartupSplash/>
        } else if (this.state.isLoggedIn === false || this.state.logInSignUpComponentDisplayMode === 'SignUpSuccess') {
            mainContainer = <LogInSignUp
                                displayMode={this.state.logInSignUpComponentDisplayMode}
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
                <Header
                    isLoggedIn={this.state.isLoggedIn}
                    onSignUpClick={this.handleSignUpClick}
                    onSignOutClick={this.handleSignOutClick}
                />

                {mainContainer}

                <Footer />
            </div>
        );
    }
}

export default App;
