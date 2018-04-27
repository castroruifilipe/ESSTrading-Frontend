import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase';
import Logo from '../../images/logo_icon.png';
import * as routes from '../../constants/routes';


const logo = (route) =>
	<Link to={route} className="navbar-brand">
		<img src={Logo} width="45" alt="" className="d-inline-block align-middle mr-3" />
		<span id="logo-text" style={{color: 'rgb(87, 102, 161)'}}>ESS Trading</span>
	</Link>


const NavBarNonAuth = () =>
	<nav className="navbar navbar-expand-lg navbar-light bg-light">
		{logo(routes.HOME)}
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
			<ul className="nav navbar-nav navbar-right">
				<li className="nav-item " style={{ margin: "0 5px" }}>
					<Link to={routes.SOBRE}>
						<button type="button" className="btn btn-light">Sobre</button>
					</Link>
				</li>
				<li className="nav-item " style={{ margin: "0 5px" }}>
					<Link to={routes.LOGIN}>
						<button type="button" className="btn btn-light">Login</button>
					</Link>
				</li>
				<li className="nav-item " style={{ margin: "0 5px" }}>
					<Link to={routes.REGISTAR}>
						<button type="button" className="btn btn-outline-success">Registar</button>
					</Link>
				</li>
			</ul>
		</div>
	</nav>

const NavBarAuth = () => (
	<nav className="navbar navbar-expand-lg navbar-light bg-light">
		{logo(routes.WATCHLIST)}
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
			<ul className="nav navbar-nav navbar-right">
				<li>
					<input className="form-control mr-sm-2" id="search" placeholder="procurar" aria-label="Search" />
				</li>
				<li className="nav-item " style={{ margin: "0 5px" }}>
					<Link to={routes.SOBRE}>
						<button type="button" className="btn btn-light">Sobre</button>
					</Link>
				</li>
				<li className="nav-item">
					<button type="button" className="btn btn-outline-danger" onClick={auth.doSignOut}>
						Logout
            		</button>
				</li>
			</ul>
		</div>
	</nav>
);

class NavBar extends Component {

	render() {
		return (
			<Col>
				{this.props.sessionStore.authUser
					? <NavBarAuth />
					: <NavBarNonAuth />
				}
				<hr className="mt-0 mb-0" style={{ height: '1%', backgroundColor: 'rgb(87, 102, 161)' }} />
			</Col>
		);
	}
}


export default compose(
	inject('sessionStore'),
	observer
)(NavBar);
