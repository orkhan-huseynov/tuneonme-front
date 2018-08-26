import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StartupSplash from './components/StartupSplash';
import LogInSignUp from './components/auth/LogInSignUp';
import ContestContainer from './components/contest/ContestContainer';
import './App.css';

// adapters
import authAdapter from './adapters/authAdapter';
import profileAdapter from './adapters/profileAdapter';

class App extends Component {
    constructor(props) {
        super(props);

        // LogInSingnUp methods
        this.handleSignUpClick = this.handleSignUpClick.bind(this);
        this.handleForgotPasswordClick = this.handleForgotPasswordClick.bind(this);
        this.handleAlreadyRegisteredClick = this.handleAlreadyRegisteredClick.bind(this);
        this.handleAlreadyRememberedClick = this.handleAlreadyRememberedClick.bind(this);
        this.handleSignedInClick = this.handleSignedInClick.bind(this);
        this.handleSignedUpClick = this.handleSignedUpClick.bind(this);
        this.handleSignOutClick = this.handleSignOutClick.bind(this);
        this.handleTuneOnMeClick = this.handleTuneOnMeClick.bind(this);

        // ContestContainer methods
        this.handleUserProfileClick = this.handleUserProfileClick.bind(this);
        this.handleMainLogoClick = this.handleMainLogoClick.bind(this);

        this.state = {
            isLoggedIn: false,
            isCheckingStoredToken: true,
            logInSignUpComponentDisplayMode: 'LogIn',
            contestContainerComponentDisplayMode: 'contest',
            currentUser: undefined,
        };
    }

    // LogInSingnUp methods
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
            profileAdapter.getCurrentUser().then(user => this.setState({
                currentUser: user,
                isLoggedIn: true,
            }));
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

        authAdapter.logOut()
            .then(logoutSuccessful => {
                if (logoutSuccessful !== false) {
                    this.setState({isLoggedIn: false})
                } else {
                    console.log('Logout error'); // TODO: add user-friendly error
                }
            })
            .catch(() => console.log('Logout error!')) // TODO: add user-friendly error
            .finally(() => this.setState({
                currentUser: undefined,
                isLoggedIn: false,
            }))

    }

    handleTuneOnMeClick() {
        this.setState({logInSignUpComponentDisplayMode: 'LogIn'});
    }

    // ContestContainer methods
    handleMainLogoClick() {
        this.setState({contestContainerComponentDisplayMode: 'contest'});
    }

    handleUserProfileClick() {
        this.setState({contestContainerComponentDisplayMode: 'profile'});
    }

    componentDidMount() {
        // check existing token and update state
        let isLoggedIn = false;
        authAdapter.checkToken()
            .then(tokenIsValid => isLoggedIn = tokenIsValid)
            .then(() => profileAdapter.getCurrentUser().then(user => this.setState({currentUser: user})))
            .finally(() => this.setState({
                isCheckingStoredToken: false,
                isLoggedIn: isLoggedIn,
            }));
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
            mainContainer = <ContestContainer
                                user={this.state.currentUser}
                                displayMode={this.state.contestContainerComponentDisplayMode}
                                onUserProfileClick={this.handleUserProfileClick}
                            />
        }



        return (
            <div className="App">
                <Header
                    isLoggedIn={this.state.isLoggedIn}
                    isCheckingStoredToken={this.state.isCheckingStoredToken}
                    onMainLogoClick={this.handleMainLogoClick}
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
