import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './NavBar';
import Home from '../scenes/Home';
import Login from '../scenes/Login';
import Registar from '../scenes/Registar';

import * as routes from '../constants/routes';


class App extends Component {
	
	render() {
		return (
			<Router>
				<div>
					<NavBar />
					<hr />

					<Route exact path={routes.HOME} component={Home}/>
					<Route exact path={routes.LOGIN} component={Login}/>
					<Route exact path={routes.REGISTAR} component={Registar}/>
				
				</div>
			</Router>
		);
	}
}


export default App;