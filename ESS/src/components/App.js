import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { firebase } from '../firebase';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';

import NavBar from './NavBar';
import Footer from './Footer';
import Home from '../scenes/Home';
import Login from '../scenes/Login';
import Registar from '../scenes/Registar';
import Sobre from '../scenes/Sobre';
import './style.css';
import * as routes from '../constants/routes';
import Watchlist from '../scenes/Watchlist';


class App extends Component {

	constructor(props) {
		super(props);


		this.state = {
			authUser: null,
			loadUser: false,
		};
	}

	componentDidMount() {
		firebase.auth.onAuthStateChanged(authUser => {
			authUser
				? this.setState(() => ({ authUser }))
				: this.setState(() => ({ authUser: null }));
			this.setState({ loadUser: true });
		})
	}

	render() {
		if (!this.state.loadUser) return null;

		return (
			<Router >
				
				<div className="wrapper">
					<div className="content">
						<NavBar authUser={this.state.authUser} />
					
						<hr className="mt-0 mb-0 separadorInicial" />

						<Route exact path={routes.HOME} component={Home} />
						<Route exact path={routes.LOGIN} component={Login} />
						<Route exact path={routes.REGISTAR} component={Registar} />
						<Route exact path={routes.SOBRE} component={Sobre} />
						<Route exact path={routes.WATCHLIST} component={Watchlist} />

					</div>

					<Footer />

				</div>

			</Router>

		);


	}



}


export default App;
