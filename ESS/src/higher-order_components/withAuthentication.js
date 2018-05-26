import React from 'react';
import { inject } from 'mobx-react';


const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {

        componentWillMount() {
            const { sessionStore } = this.props;
            let token = sessionStorage.getItem('jwtToken');
            if (!token) {
                sessionStore.setToken(null);
            } else {
                sessionStore.setToken(token);
            }
        }

        render() {
            return <Component {...this.props} />;
        }
    }

    return inject('sessionStore')(WithAuthentication);
}

export default withAuthentication;