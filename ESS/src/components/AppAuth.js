import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'

import withAtivos from '../higher-order_components/withAtivos';
import Watchlist from '../scenes/Watchlist';
import Sidebar from './Sidebar';
import * as routes from '../constants/routes';
import './style.css';


class AppAuth extends Component {

	render() {
		//if (!this.state.loadUser) return null;

		return (
			<div className="wrapper2">
				<Sidebar />

				<div id="content" class="container-fluid">
					<Redirect to={routes.WATCHLIST}/>
					<Route exact path={routes.WATCHLIST} component={Watchlist} />
				</div>
			</div>

		);
	}
}

export default AppAuth;