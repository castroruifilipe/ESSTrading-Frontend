import React, { Component } from 'react';
import { Table } from 'reactstrap';
import withAtivos from '../../higher-order_components/withAtivos';

import ButaoVariacao from './components/ButaoVariacao';
import AtivosContext from '../../contexts/AtivosContext';


const header = [
	'Ativo',
	<ButaoVariacao onChangeVariacao={(variacao) => this.changeVariacao(variacao)} />,
	'Vender',
	'Comprar'
];

class HomeTable extends Component {

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
									<td key={1}>{ativos[symbol]['change']}</td>
									<td key={2}>
										<button type="button" class="btn btn-light">
											<span class="badge badge-primary">V</span> 43.5
										</button>
										{ativos[symbol]['venda']}
									</td>
									<td key={3}>
										<button type="button" class="btn btn-light">
											<span class="badge badge-primary">C</span> 43.5
										</button>
										{ativos[symbol]['compra']}
									</td>
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