import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './NavBar';
import Footer from './Footer';
import Home from '../scenes/Home';
import Login from '../scenes/Login';
import Registar from '../scenes/Registar';
import Sobre from '../scenes/Sobre';

import * as routes from '../constants/routes';


class App extends Component {

	render() {
		return (
			<Router >
				<div id="wrapper">
					<div id="content">
						<NavBar />
						<hr class="mt-0 mb-0" />

						<Route exact path={routes.HOME} component={Home}/>
						<Route exact path={routes.LOGIN} component={Login}/>
						<Route exact path={routes.REGISTAR} component={Registar}/>
						<Route exact path={routes.SOBRE} component={Sobre}/>
					</div>
					<div id="footer">
						<Footer />
					</div>
				</div>

			</Router>
		);
	}
}


export default App;
