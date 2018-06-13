import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Row } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import withAuthentication from '../higher-order_components/withAuthentication';
import NavBar from './NavBar';
import Home from '../scenes/Home';
import Login from '../scenes/Login';
import Registar from '../scenes/Registar';
import Sobre from '../scenes/Sobre';
import AppAuth from './AppAuth';
import * as routes from '../constants/routes';
import './style.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			authenticated: undefined
		};
	}


	render() {
		let homeRoute = <Route exact path={routes.HOME} component={Home} />;;
		if (this.props.sessionStore.token) {
			homeRoute = <Route exact path={routes.HOME} component={AppAuth} />;
		}

		return (
			<Router >
				<div>
					<Row>
						<NavBar />
					</Row>
					<Switch>
						{homeRoute}
						<Route exact path={routes.LOGIN} component={Login} />
						<Route exact path={routes.REGISTAR} component={Registar} />
						<Route exact path={routes.SOBRE} component={Sobre} />
						<Route path={routes.AUTH} component={AppAuth} />
					</Switch>
				</div>
			</Router >

		);
	}
}

export default compose(
    withAuthentication,
    inject('sessionStore'),
    observer
)(App);