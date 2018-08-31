import React from 'react';
import { Button } from 'reactstrap';

// adapters

// icons

class LevelButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let componentClassName;

        if(this.props.status === 'passed') {
            componentClassName = 'contest_level_btn';
        } else if(this.props.status === 'active') {
            componentClassName = 'contest_level_btn_active';
        } else if(this.props.status === 'inactive') {
            componentClassName = 'contest_level_btn_inactive';
        } else {
            componentClassName = 'contest_level_btn_new';
        }

        return(
            <Button className={ componentClassName }>{this.props.name}</Button>
        );
    }
}

export default LevelButton;