import React from 'react';
import { inject } from 'mobx-react';


const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {

        componentWillMount() {
            const { sessionStore, cfdsStore, historyStore } = this.props;
            let token = sessionStorage.getItem('jwtToken');
            if (!token) {
                sessionStore.setToken(null);
            } else {
                sessionStore.setToken(token);
                cfdsStore.updateCFDs(token);
                historyStore.updateMovs(token);
            }
        }

        render() {
            return <Component {...this.props} />;
        }
    }

    return inject('sessionStore', 'cfdsStore', 'historyStore')(WithAuthentication);
}

export default withAuthentication;