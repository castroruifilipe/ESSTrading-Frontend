import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import withAuthentication  from '../higher-order_components/withAuthentication';
import NavBar from './NavBar';
import Footer from './Footer';
import Home from '../scenes/Home';
import Login from '../scenes/Login';
import Registar from '../scenes/Registar';
import Sobre from '../scenes/Sobre';
import AppAuth from './AppAuth';
import * as routes from '../constants/routes';
import withAtivos from '../higher-order_components/withAtivos';
import './style.css';

class App extends Component {

	render() {
		//if (!this.state.loadUser) return null;

		return (
			<Router >
				<Switch>
					<div className="wrapper">
						<NavBar />
						<div className="content">

							<hr className="mt-0 mb-0 separadorInicial" />

							<Route exact path={routes.HOME} component={Home} />
							<Route exact path={routes.LOGIN} component={Login} />
							<Route exact path={routes.REGISTAR} component={Registar} />
							<Route exact path={routes.SOBRE} component={Sobre} />
							<Route path={routes.AUTH} component={AppAuth} />

						</div>

						<Footer />

					</div>
				</Switch>
			</Router>

		);
	}
}

export default withAuthentication(App);
