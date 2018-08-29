import React from 'react';
import { Button, Container, Row, Col, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import UserSmall from './UserSmall';
import vs_icon from '../../images/vs_icon.png';

// adapters
import profileAdapter from '../../adapters/profileAdapter';

class ContestUsersUnconnected extends React.Component {
    constructor(props){
        super(props);

        this.handleUserProfileClick = this.handleUserProfileClick.bind(this);
        this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
    }

    componentDidMount() {

    }

    handleUserProfileClick() {
        this.props.onUserProfileClick();
    }

    handleSearchStringChange() {
        const searchStringInput = document.getElementById('searchString');


        if (searchStringInput !== null && searchStringInput.value != '') {
            const searchString = encodeURIComponent(searchStringInput.value);

            profileAdapter.getSearchSuggestions(searchString)
                .then(foundProfiles => {

                })
                .catch(() => console.log('Error getting suggestions'))
        }
    }

    render() {
        return (
            <Container className="Container-contest-users">
                <Row>
                    <Col>
                        <InputGroup className="InputGroup-member-search">
                            <Input placeholder="id or name" name="searchString" id="searchString" onChange={this.handleSearchStringChange} />
                            <InputGroupAddon className="input-group-append" addonType="prepend">
                                <span className="input-group-text">
                                    <Button className="btn-link btn-no-border btn-no-padding"><i className="fa fa-search" aria-hidden="true"></i></Button>
                                </span>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                    <Col>
                        <img className="IMG-vs-icon" src={vs_icon} alt="vs" />
                    </Col>
                    <Col>
                        <UserSmall user={this.props.user} onUserClick={this.handleUserProfileClick} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ContestUsersUnconnected;