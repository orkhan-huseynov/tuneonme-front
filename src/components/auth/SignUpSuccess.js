import React from 'react';
import { Button, Card, CardTitle, CardText } from 'reactstrap';

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
                <Card body className="text-center welcomeCard">
                    <CardTitle>Welcome!</CardTitle>
                    <CardText>
                        My funny Valentine, sweet comic Valentine<br />
                        You make me smile with my heart<br />
                        Your looks are laughable<br />
                        Unphotographable<br />
                        Yet you're my favorite work of art<br />
                        Is your figure less than Greek?<br />
                        Is your mouth a little weak?<br />
                        When you open it to speak<br />
                        Are you smiling?<br />
                        But don't change a hair for me<br />
                        Not if you care for me<br />
                        Stay little Valentine, stay<br />
                        Each day is Valentine's Day
                    </CardText>
                    <Button color="success" onClick={this.handleTuneOnMeClick}>Tune On Me!</Button>
                </Card>
            </section>
        );
    }
}

export default SignUpSuccess;