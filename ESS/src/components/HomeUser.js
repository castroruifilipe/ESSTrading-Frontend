import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { firebase } from '../firebase';
import withAuthentication from './withAuthentication';
import withAuthorization from './withAuthorization';

import NavBar from './NavBar';
import Footer from './Footer';
import Home from '../scenes/Home';
import Login from '../scenes/Login';
import Registar from '../scenes/Registar';
import Sobre from '../scenes/Sobre';
import './style.css';
import * as routes from '../constants/routes';
import Watchlist from '../scenes/Watchlist';
import Sidebar from './Sidebar';

class HomeUser extends Component {

	constructor(props) {
		super(props);
	}


	render() {
		//if (!this.state.loadUser) return null;

		return (
			<div className="wrapper2">
					<Sidebar />
					<div id="content">
						<Route exact path={routes.WATCHLIST} component={Watchlist} />
					</div>
			</div>

		);
	}
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(HomeUser);
