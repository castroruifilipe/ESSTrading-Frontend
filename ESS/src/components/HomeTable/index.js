import React, { Component } from 'react';
import Table from '../Table'

class HomeTable extends Component {
	constructor(props){
		super(props);
		this.state={
			header: [
				'Ativo',
				<div className="dropdown text-center">
					<button className="btn btn-light dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Variação
					</button>
					<div className="dropdown-menu" aria-labelledby="dropdownMenu2">
						<button className="dropdown-item" type="button">1H</button>
						<button className="dropdown-item" type="button">4H</button>
						<button className="dropdown-item" type="button">1D</button>
					</div>
				</div>
				,'Venda($)',
				'Compra($)'
			],
			rows: [{ativo: 'AMZN',variacao: '0.48%', venda: 1542.61, compra: 1545.74},
						 {ativo: 'AAPL', variacao: '-0.93%', venda: 174.67, compra: 175.01}
					 ]
				 }
	}

updateRows(){
	this.setState();
}

	render() {
		return (
				<Table
					header={this.state.header}
					rows={this.state.rows}
				/>
		);
	}
}


export default HomeTable;
