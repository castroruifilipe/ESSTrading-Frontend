import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import { Container } from 'reactstrap';

import Watchlist from '../scenes/Watchlist';
import Portefolio from '../scenes/Portefolio';
import Geral from '../scenes/Geral';
import Conta from '../scenes/Conta';
import LevantarPlafond from '../scenes/LevantarPlafond';
import Sidebar from './Sidebar';
import * as routes from '../constants/routes';


class AppAuth extends Component {

	constructor(props) {
		super(props);

		this.state = {
			modal: false,
		};

		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	render() {
		return (
			<div className="wrapper2">
				<Sidebar toggle={this.toggle} />

				<Container fluid id="content">
					<Redirect to={routes.WATCHLIST} />
					<Switch>
						<Route exact path={routes.WATCHLIST} component={Watchlist} />
						<Route exact path={routes.PORTEFOLIO} component={Portefolio} />
						<Route exact path={routes.GERAL} component={Geral} />
						<Route exact path={routes.CONTA} component={Conta} />
					</Switch>
				</Container>

				<LevantarPlafond modal={this.state.modal} toggle={this.toggle} />
			</div>

		);
	}
}

export default AppAuth;
