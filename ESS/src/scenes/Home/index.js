import React, { Component } from 'react';

import { db } from '../../firebase';
import HomeTable from '../../components/HomeTable'

class Home extends Component {

	componentDidMount() {
		db.onceGetUsers().then(snapshot =>
			console.log(snapshot.val()));
	}

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
