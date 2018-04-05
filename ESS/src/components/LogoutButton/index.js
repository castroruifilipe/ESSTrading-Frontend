import React, { Component } from 'react';

import { auth } from '../../firebase';


class LogoutButton extends Component {

    render() {
        return (
            <button type="button" className="btn btn-outline-danger" onClick={auth.doSignOut}>
                Logout
                
            </button>
        )
    }
}


export default LogoutButton;
