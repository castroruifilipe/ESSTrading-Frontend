import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import { firebase } from '../firebase';
import withAuthentication from '../higher-order_components/withAuthentication';
import NavBar from './NavBar';
import Footer from './Footer';
import Home from '../scenes/Home';
import Login from '../scenes/Login';
import Registar from '../scenes/Registar';
import Sobre from '../scenes/Sobre';
import AppAuth from './AppAuth';
import * as routes from '../constants/routes';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			authenticated: undefined
		};
	}


	componentDidMount() {
		firebase.auth.onAuthStateChanged(authUser => {
			if (!authUser) {
				this.setState({ authenticated: false });
			} else {
				this.setState({ authenticated: true });
			}
		});
	}


	render() {
		if (this.state.authenticated === undefined) return null;

		let homeRoute = undefined;
		if (this.state.authenticated === false) {
			homeRoute = <Route exact path={routes.HOME} component={Home} />;
		} else {
			homeRoute = <Route exact path={routes.HOME} component={AppAuth} />;
		}

		return (
			<Router >
				<div>
					<Row>
						<NavBar />
					</Row>
					<Row style={{ minHeight: '80vh' }}>
						<Col>
							<div>
								<Switch>
									{homeRoute}
									<Route exact path={routes.LOGIN} component={Login} />
									<Route exact path={routes.REGISTAR} component={Registar} />
									<Route exact path={routes.SOBRE} component={Sobre} />
									<Route path={routes.AUTH} component={AppAuth} />
								</Switch>
							</div>
						</Col>
					</Row>
					<Row>
						<Footer />
					</Row>

				</div>
			</Router>

		);
	}
}

export default withAuthentication(App);
