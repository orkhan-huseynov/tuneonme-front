import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer className="App-footer">
                <span>Tune On Me &copy; { (new Date()).getFullYear() }</span>
            </footer>
        );
    }
}

export default Footer;