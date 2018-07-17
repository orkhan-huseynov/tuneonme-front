import React from 'react';
import { Button } from 'reactstrap';

class SignUpSuccess extends React.Component {
    constructor(props) {
        super(props);

        this.handleTuneOnMeClick = this.handleTuneOnMeClick.bind(this);
    }

    handleTuneOnMeClick(e) {
        this.props.onTuneOnMeClick();
        e.preventDefault();
    }

    render() {
        return (
            <section className="Section-LogInSignUpForm">
                My funny valentine...

                <Button color="success" onClick={this.handleTuneOnMeClick}>Tune On Me!</Button>
            </section>
        );
    }
}

export default SignUpSuccess;