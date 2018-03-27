import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';


class NavBar extends Component {

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<Link to={routes.HOME} className="navbar-brand">ESS Trading</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
					<ul className="nav navbar-nav navbar-right">
						<li>
							<input className="form-control mr-sm-2" id="search"  placeholder="procurar" aria-label="Search" />
						</li>
						<li className="nav-item ">
							<Link to={routes.SOBRE} className="nav-link">Sobre</Link>
						</li>
						<li className="nav-item ">
							<Link to={routes.LOGIN} className="nav-link">Login</Link>
						</li>
						<li className="nav-item ">
							<Link to={routes.REGISTAR} className="nav-link">Registar</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}


export default NavBar;
