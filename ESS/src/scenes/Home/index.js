import React, { Component } from 'react';

import HomeTable from '../../components/HomeTable'

class Home extends Component {

	render() {
		return (
			<div className="container">
				<h1>Ativos Financeiros</h1>
				<HomeTable />
			</div>
		);
	}
}


export default Home;
