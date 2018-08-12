import React from 'react';
import { Button } from 'reactstrap';
import logo from '../images/logo.png'

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.handleSignUpClick = this.handleSignUpClick.bind(this);
        this.handleSignOutClick = this.handleSignOutClick.bind(this);
    }

    handleSignUpClick() {
        this.props.onSignUpClick();
    }

    handleSignOutClick() {
        this.props.onSignOutClick();
    }

    render() {
        let signUpOutButtons = null;
        let sectionTop = null;

        if (this.props.isLoggedIn) {
            signUpOutButtons = <Button color="success" onClick={this.handleSignOutClick}>Sign Out</Button>;
        } else {
            signUpOutButtons = <Button color="success" onClick={this.handleSignUpClick} disabled={this.props.isCheckingStoredToken}>Sign Up</Button>;
            sectionTop = (
                <section className="Section-top">
                    <h1 className="Section-top-heading-main">Tune On Me</h1>
                    <h3 className="Section-top-heading-sub">Be on the same wavelength</h3>
                </section>
            );
        }

        return (
            <header className="App-header">
                <div className="container">
                    <div className="row App-header-row">
                        <div className="col-7">
                        </div>
                        <div className="col-2">
                        </div>
                        <div className="col-3">
                            {signUpOutButtons}
                        </div>
                    </div>
                </div>
                <div className="App-header-logo">
                    <a><img src={logo} alt="logo" /></a>
                </div>
                {sectionTop}
            </header>
        );
    }
}

export default Header;