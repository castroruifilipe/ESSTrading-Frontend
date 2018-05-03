import React, { Component } from 'react';
import { Col } from 'reactstrap';

class Footer extends Component {

	render() {
		return (
			<div>
				<footer className="footer font-small stylish-color-dark">
					<div className="row text-center text-md-left">
						<hr className="m-0" />
						<p className="text-center text-md-left grey-tex mb-0">
							© 2018 Copyright: <strong>ESS Trading</strong>
						</p>
					</div>
				</footer>
			</div>
		);
	}
}

export default Footer;
