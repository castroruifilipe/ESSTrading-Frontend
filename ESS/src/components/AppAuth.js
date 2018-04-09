import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'

import Watchlist from '../scenes/Watchlist';
import AbrirCFD from '../scenes/Watchlist/components/AbrirCFD';
import Sidebar from './Sidebar';
import * as routes from '../constants/routes';
import './style.css';


class AppAuth extends Component {

	render() {
		//if (!this.state.loadUser) return null;

		return (
			<div className="wrapper2">
				<Sidebar />

				<div id="content" className="container-fluid">
					<Redirect to={routes.WATCHLIST}/>
					<Route exact path={routes.WATCHLIST} component={Watchlist} />
					<Route exact path={routes.ABRIR_CFD} component={AbrirCFD} />
				</div>
			</div>

		);
	}
}

export default AppAuth;