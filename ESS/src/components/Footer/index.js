import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';


class Footer extends Component {

	render() {
		return (
			<footer	class="footer mt-1 text-center">
				<hr class="mt-0 mb-0 separadorFooter" />
				<br />
        © ESS Trading - 2018
			</footer>
		);
	}
}


export default Footer;
