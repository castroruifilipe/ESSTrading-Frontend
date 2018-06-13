import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import { Container } from 'reactstrap';

import Watchlist from '../scenes/Watchlist';
import Portefolio from '../scenes/Portefolio';
import Conta from '../scenes/Conta';
import LevantarPlafond from '../scenes/LevantarPlafond';
import DepositarPlafond from '../scenes/DepositarPlafond';
import Sidebar from './Sidebar';
import Historico from '../scenes/Historico';
import * as routes from '../constants/routes';


class AppAuth extends Component {

	constructor(props) {
		super(props);

		this.state = {
			modalDepositar: false,
			modalLevantar: false,
		};

		this.toggleDepositar = this.toggleDepositar.bind(this);
		this.toggleLevantar = this.toggleLevantar.bind(this);
	}

	toggleDepositar() {
		this.setState({
			modalDepositar: !this.state.modalDepositar
		});
	}

	toggleLevantar() {
		this.setState({
			modalLevantar: !this.state.modalLevantar
		});
	}

	render() {
		return (
			<div className="wrapper2">
				<Sidebar toggleLevantar={this.toggleLevantar} toggleDepositar={this.toggleDepositar} />

				<Container fluid id="content" className="pageContent">
					<Redirect to={routes.WATCHLIST} />
					<Switch>
						<Route exact path={routes.WATCHLIST} component={Watchlist} />
						<Route exact path={routes.PORTEFOLIO} component={Portefolio} />
						<Route exact path={routes.HISTORICO} component={Historico} />
						<Route exact path={routes.CONTA} component={Conta} />
					</Switch>
				</Container>

				<LevantarPlafond modal={this.state.modalLevantar} toggle={this.toggleLevantar} />
				<DepositarPlafond modal={this.state.modalDepositar} toggle={this.toggleDepositar} />
			</div>

		);
	}
}

export default AppAuth;