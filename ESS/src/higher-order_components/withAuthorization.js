import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import * as routes from '../constants/routes';

const withAuthorization = (authCondition) => (Component) => {

    class WithAuthorization extends React.Component {

        componentDidMount() {
            if (!this.props.sessionStore.token) {
                this.props.history.push(routes.LOGIN);
            }
        }

        render() {
            return this.props.sessionStore.user ? <Component {...this.props} /> : null;
        }
    }

    return compose(
        withRouter,
        inject('sessionStore'),
        observer
    )(WithAuthorization);
}

export default withAuthorization;