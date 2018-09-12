import React from 'react';
import { Container, Row, Col, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import UserSmall from './UserSmall';
import vs_icon from '../../images/vs_icon.png';
import AutoSuggest from 'react-autosuggest';
import AutoSuggestHighlightMatch from 'autosuggest-highlight/match';
import AutoSuggestHighlightParse from 'autosuggest-highlight/parse';
import config from '../../config';
import profilePicturePlaceholder from '../../images/default_profile.png';

// adapters
import profileAdapter from '../../adapters/profileAdapter';

class ContestUsersUnconnected extends React.Component {
    constructor(props){
        super(props);

        this.handleUserProfileClick = this.handleUserProfileClick.bind(this);
        this.handleSearchStringChange = this.handleSearchStringChange.bind(this);

        this.state = {
            value: '',
            suggestions: [],
            isLoading: false,
        };
    }

    loadSuggestions(value) {
        this.setState({ isLoading: true });

        const searchString = encodeURIComponent(value);

        profileAdapter.getSearchSuggestions(searchString)
            .then(foundProfiles => {
                console.log(foundProfiles);
                this.setState({ suggestions: foundProfiles.profiles })
            })
            .catch(() => console.log('Error getting suggestions'))
            .finally(() => this.setState({ isLoading: false }))
    }

    componentDidMount() {

    }

    handleUserProfileClick() {
        this.props.onUserProfileClick();
    }

    handleSearchStringChange = (event, { newValue }) => {
        this.setState({ value: newValue });
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.loadSuggestions(value);
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    getSuggestionValue(suggestion) {
        return `${suggestion.name} ${suggestion.lastname}`;
    }

    renderSuggestion(suggestion, { query }) {
        const suggestionText = `${suggestion.name} ${suggestion.lastname}`;
        const matches = AutoSuggestHighlightMatch(suggestionText, query);
        const parts = AutoSuggestHighlightParse(suggestionText, matches);

        const suggestionImage = (suggestion.profilePicture === null) ? profilePicturePlaceholder : `${config.storagePath}${suggestion.profilePicture}`;

        return (
            <div className={'suggestion-content'}>
              <div className="name">
                  <Row>
                      <Col xs="2">
                          <img className="thumb-image-tiny img-circle" src={suggestionImage} />
                      </Col>
                      <Col xs="10">
                          <div className="suggestion-value">
                            {
                                parts.map((part, index) => {
                                    const className = part.highlight ? 'highlight' : null;

                                    return (
                                        <span className={className} key={index}>{part.text}</span>
                                    );
                                })
                            }
                          </div>
                    </Col>
                  </Row>
              </div>
            </div>
        );
    }

    render() {
        const { value, suggestions, isLoading } = this.state;
        const inputProps = {
            placeholder: "ID or name",
            value,
            onChange: this.handleSearchStringChange
        };
        const status = (isLoading ? 'Loading...' : 'Type to load suggestions');


        return (
            <Container className="Container-contest-users">
                <Row>
                    <Col>
                        {/*<InputGroup className="InputGroup-member-search">*/}
                            {/*<Input placeholder="id or name" name="searchString" id="searchString" onChange={this.handleSearchStringChange} />*/}
                            {/*<InputGroupAddon className="input-group-append" addonType="prepend">*/}
                                {/*<span className="input-group-text">*/}
                                    {/*<Button className="btn-link btn-no-border btn-no-padding"><i className="fa fa-search" aria-hidden="true"></i></Button>*/}
                                {/*</span>*/}
                            {/*</InputGroupAddon>*/}
                        {/*</InputGroup>*/}
                        <AutoSuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            inputProps={inputProps}
                        />
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