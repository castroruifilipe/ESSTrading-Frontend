import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LogoutButton from '../LogoutButton';

import * as routes from '../../constants/routes';

const NavBarNonAuth = () =>
	<ul className="nav navbar-nav navbar-right">
		<li>
			<input className="form-control mr-sm-2" id="search" placeholder="procurar" aria-label="Search" />
		</li>
		<li className="nav-item " style={{margin:"0 5px"}}>
			<Link to={routes.SOBRE}>
				<button type="button" class="btn btn-light">Sobre</button>
			</Link>
		</li>
		<li className="nav-item " style={{margin:"0 5px"}}>
			<Link to={routes.LOGIN}>
				<button type="button" class="btn btn-light">Login</button>
			</Link>
		</li>
		<li className="nav-item " style={{margin:"0 5px"}}>
			<Link to={routes.REGISTAR}>
				<button type="button" class="btn btn-outline-success">Registar</button>
			</Link>
		</li>
	</ul>

const NavBarAuth = () =>
	<ul className="nav navbar-nav navbar-right">
		<li>
			<input className="form-control mr-sm-2" id="search" placeholder="procurar" aria-label="Search" />
		</li>
		<li className="nav-item " style={{margin:"0 5px"}}>
			<Link to={routes.SOBRE}>
				<button type="button" class="btn btn-light">Sobre</button>
			</Link>
		</li>
		<li className="nav-item">
			<LogoutButton />
		</li>
	</ul>


class NavBar extends Component {

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<Link to={routes.HOME} className="navbar-brand">ESS Trading</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
				
				{ this.props.authUser
					? <NavBarAuth />
					: <NavBarNonAuth />
				}

				</div>
			</nav>
		);
	}
}


export default NavBar;
