import React, { Component } from 'react';
import Table from '../Table'
import ButaoVariacao from './components/ButaoVariacao'

class HomeTable extends Component {
	constructor(props){
		super(props);
		this.state={
			header: ['Ativo',
				<ButaoVariacao  onChangeVariacao={(variacao)=> this.changeVariacao(variacao)} />,
				'Venda($)',
				'Compra($)'
			],
			rows: [{ativo: 'AMZN',variacao: '0.48%', venda: 1542.61, compra: 1545.74},
						 {ativo: 'AAPL', variacao: '-0.93%', venda: 174.67, compra: 175.01}
					 ]
		};

	}

	changeVariacao(variacao){
		console.log(variacao +' from HomeTable');
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
