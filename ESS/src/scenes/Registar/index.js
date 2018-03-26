import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import RegistarForm from './components/RegistarForm';


class Registar extends Component {

	render() {
		return (
			<div>
				<h1>Registar</h1>
				<RegistarForm history={this.props.history} />
			</div>
		);
	}
}

export default withRouter(Registar);