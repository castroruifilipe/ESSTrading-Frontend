import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';


class ToggleSwitch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: props.defaultIndex,
        };
    }

    toggle = () => {
        this.setState(prevState => ({
            active: 1 - prevState.active,
        }));
        this.props.onSwitchChange(this.state.active);
    }

    render() {
        if (this.state.active === 0) {
            return (
                <ButtonGroup className="btn-toggle">
                    <Button className="btn-default" onClick={this.toggle} color="primary" active>{this.props.values[0]}</Button>
                    <Button onClick={this.toggle}>{this.props.values[1]}</Button>
                </ButtonGroup>
            );
        } else {
            return (
                <ButtonGroup className="btn-toggle">
                    <Button onClick={this.toggle}>{this.props.values[0]}</Button>
                    <Button onClick={this.toggle} className="btn-default" color="primary" active>{this.props.values[1]}</Button>
                </ButtonGroup>

            );
        }
    }
}


export default ToggleSwitch;
