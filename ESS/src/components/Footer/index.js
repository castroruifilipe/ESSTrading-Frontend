import React, { Component } from 'react';
import { Col } from 'reactstrap';

class Footer extends Component {

	render() {
		return (
			<Col>
				<footer className="footer font-small stylish-color-dark">
					<div className="container text-center text-md-left">
						<hr className="m-0" />
						<p className="text-center text-md-left grey-text pt-3">
							© 2018 Copyright: <strong>ESS Trading</strong>
						</p>
					</div>
				</footer>
			</Col>
		);
	}
}

export default Footer;
