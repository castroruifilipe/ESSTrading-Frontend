import React, { Component } from 'react';


class Alert extends Component {

    render() {
        return (
            <div className={`alert alert-${this.props.alertType}`}>
                {this.props.message}
            </div>
        )
    }
}


export default Alert;