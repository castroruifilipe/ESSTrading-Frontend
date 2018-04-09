import React, { Component } from 'react';
import { Table, Button, Badge } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import withAtivos from '../../higher-order_components/withAtivos';
import ButaoVariacao from './components/ButaoVariacao';
import AtivosContext from '../../contexts/AtivosContext';
import AbrirCFD from '../../scenes/Watchlist/components/AbrirCFD';
import * as routes from '../../constants/routes';
import cfdEnum from '../../constants/cfdEnum';
import './style.css';


const header = [
	'Ativo',
	<ButaoVariacao onChangeVariacao={(variacao) => this.changeVariacao(variacao)} />,
	'Vender',
	'Comprar'
];

class HomeTable extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			ativoSelected: undefined,
			tipoCFD: undefined
		};

		this.toggle = this.toggle.bind(this);
	}

	toggle = () => {
		if (this.state.modal == true) {
			this.setState({
				ativoSelected: undefined,
				modal: !this.state.modal,
			});
		} else {
			this.setState({
				modal: !this.state.modal,
			});
		}
	}

	onClickRow = ativo => tipoCFD => event => {
		this.setState({
			ativoSelected: ativo,
			tipoCFD: tipoCFD,
		});
		this.toggle();
	}

	render() {
		return (
			<div>
				<Table striped bordered responsive className="text-center">
					<thead className="thead-light">
						<tr>
							{header.map((elem, i) => <th key={i}>{elem}</th>)}
						</tr>
					</thead>
					<AtivosContext.Consumer >
						{ativos => (
							<tbody id="table">
								{Object.keys(ativos).map((symbol) =>
									<tr key={symbol}>
										<td key={0} style={{ width: '25%', verticalAlign: 'middle' }}>
											{symbol}
										</td>
										<td key={1} style={{ width: '25%', verticalAlign: 'middle' }}>
											{ativos[symbol].changePercent}
										</td>
										<td key={2} style={{ width: '25%', verticalAlign: 'middle' }}>
											<Button color="light" type="button" className="btnprice" onClick={this.onClickRow(ativos[symbol])(cfdEnum.VENDER)}>
												<Badge color="primary" className="price">V</Badge>
												{ativos[symbol].iexBidPrice}
											</Button>
										</td>
										<td key={3} style={{ width: '25%', verticalAlign: 'middle' }}>
											<Button color="light" type="button" className="btnprice" onClick={this.onClickRow(ativos[symbol])(cfdEnum.COMPRAR)}>
												<Badge color="primary" className="price">C</Badge>
												{ativos[symbol].iexAskPrice}
											</Button>
										</td>
									</tr>
								)}
							</tbody>
						)}
					</AtivosContext.Consumer >
				</Table>

				{this.state.ativoSelected !== undefined &&
					<AbrirCFD modal={this.state.modal} toggle={this.toggle} ativo={this.state.ativoSelected} tipoCFD={this.state.tipoCFD} />
				}
			</div>
		);
	}
}

export default withAtivos(withRouter(HomeTable));