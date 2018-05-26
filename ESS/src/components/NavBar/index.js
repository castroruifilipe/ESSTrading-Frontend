import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';

import Logo from '../../images/logo_icon.png';
import * as routes from '../../constants/routes';


class NavBar extends Component {

	signOut = () => {
		this.props.sessionStore.setToken(false);
		this.props.history.push(routes.LOGIN);
	}

	render() {
		if (this.props.sessionStore.token) {
			return (
				<nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light ">
					<Link to={routes.WATCHLIST} className="navbar-brand">
						<img src={Logo} width="45" alt="" className="d-inline-block align-middle mr-3" />
						<span id="logo-text" style={{ color: 'rgb(87, 102, 161)' }}>ESS Trading</span>
					</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
						<ul className="nav navbar-nav navbar-right">
							<li className="nav-item " style={{ margin: "0 5px" }} data-toggle="collapse" data-target=".navbar-collapse.show">
								<Link to={routes.SOBRE} >
									<button type="button" className="btn btn-light">Sobre</button>
								</Link>
							</li>
							<li className="nav-item">
								<button type="button" className="btn btn-outline-danger" onClick={this.signOut}>
									Logout
            					</button>
							</li>
						</ul>
					</div>
				</nav>
			);
		} else {
			return (
				<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
					<Link to={routes.HOME} className="navbar-brand">
						<img src={Logo} width="45" alt="" className="d-inline-block align-middle mr-3" />
						<span id="logo-text" style={{ color: 'rgb(87, 102, 161)' }}>ESS Trading</span>
					</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
						<ul className="nav navbar-nav navbar-right">
							<li className="nav-item " style={{ margin: "0 5px" }} data-toggle="collapse" data-target=".navbar-collapse.show">
								<Link to={routes.SOBRE} >
									<button type="button" className="btn btn-light">Sobre</button>
								</Link>
							</li>
							<li className="nav-item " style={{ margin: "0 5px" }} data-toggle="collapse" data-target=".navbar-collapse.show">
								<Link to={routes.LOGIN}>
									<button type="button" className="btn btn-light">Login</button>
								</Link>
							</li>
							<li className="nav-item " style={{ margin: "0 5px" }} data-toggle="collapse" data-target=".navbar-collapse.show">
								<Link to={routes.REGISTAR}>
									<button type="button" className="btn btn-outline-success">Registar</button>
								</Link>
							</li>
						</ul>
					</div>
				</nav>
			)
		}
	}
}


export default compose(
	withRouter,
	inject('sessionStore'),
	observer
)(NavBar);
