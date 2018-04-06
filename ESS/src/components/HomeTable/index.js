import React, { Component } from 'react';
import { Table } from 'reactstrap';
import ButaoVariacao from './components/ButaoVariacao';
import AtivosContext from '../../contexts/AtivosContext';
import withAtivos from '../../higher-order_components/withAtivos';


const header = ['Ativo',
	<ButaoVariacao onChangeVariacao={(variacao) => this.changeVariacao(variacao)} />,
	'Venda($)',
	'Compra($)'
];


class HomeTable extends Component {

	getColumns(ativos, symbol) {
		return Object.values(ativos[symbol]).map((lm, i) => <td key={i} >{lm}</td>)
	}

	render() {
		return (
			<AtivosContext.Consumer >
				{ativos => (
					<Table striped hover bordered responsive className="text-center">
						<thead className="thead-light">
							<tr>
								{header.map((elem, i) => <th key={i}>{elem}</th>)}
							</tr>
						</thead>
						<tbody id="table">
							{Object.keys(ativos).map((symbol) => 
								<tr key={symbol}>
									<td key={0}>{symbol}</td>
									<td key={1}>{ativos[symbol]['variacao']}</td>
									<td key={2}>{ativos[symbol]['venda']}</td>
									<td key={3}>{ativos[symbol]['compra']}</td>
								</tr>
							)}
						</tbody>
					</Table>
				)}
			</AtivosContext.Consumer >
		);
	}
}


export default withAtivos(HomeTable);
