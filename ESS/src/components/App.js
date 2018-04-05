import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { firebase } from '../firebase';
import withAuthentication from './withAuthentication';

import NavBar from './NavBar';
import Footer from './Footer';
import Home from '../scenes/Home';
import Login from '../scenes/Login';
import Registar from '../scenes/Registar';
import Sobre from '../scenes/Sobre';
import './style.css';
import * as routes from '../constants/routes';
import Watchlist from '../scenes/Watchlist';
import HomeUser from './HomeUser';

class App extends Component {

	constructor(props) {
		super(props);
	}


	render() {
		//if (!this.state.loadUser) return null;

		return (
			<Router >
				<div className="wrapper">
					<NavBar />
					<div className="content">

						<hr className="mt-0 mb-0 separadorInicial" />

						<Route exact path={routes.HOME} component={Home} />
						<Route exact path={routes.LOGIN} component={Login} />
						<Route exact path={routes.REGISTAR} component={Registar} />
						<Route exact path={routes.SOBRE} component={Sobre} />
						<Route path={"/auth"} component={HomeUser} />

					</div>

					<Footer />

				</div>

			</Router>

		);
	}
}

export default withAuthentication(App);
