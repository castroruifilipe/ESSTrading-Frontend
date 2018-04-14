import React, { Component } from 'react';
import { Media, Table, Button, Badge } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import withAtivos from '../../higher-order_components/withAtivos';
import ButaoVariacao from './components/ButaoVariacao';
import AtivosContext from '../../contexts/AtivosContext';
import AbrirCFD from '../../scenes/Watchlist/components/AbrirCFD';
import cfdEnum from '../../constants/cfdEnum';
import { formatterPercent, formatterPrice } from '../../constants/formatters';
import './style.css';


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
		if (this.state.modal === true) {
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
				<Table responsive >
					<thead className="thead-light">
						<tr>
							<th key={0}>Mercados</th>
							<th key={1}><ButaoVariacao onChangeVariacao={(variacao) => this.changeVariacao(variacao)} /></th>
							<th key={2} className="text-center">Vender</th>
							<th key={3} className="text-center">Comprar</th>
						</tr>
					</thead>
					<AtivosContext.Consumer >
						{ativos => (
							<tbody id="table">
								{Object.keys(ativos).map((symbol) =>
									<tr key={symbol}>
										<td key={0} style={{ width: '25%', verticalAlign: 'middle' }}>
											<Media>
												<Media left style={{ margin: '5px 10px 5px 0px' }}>
													<Media object src={ativos[symbol].logo} style={{ maxWith: '64px', maxHeight: '64px' }} />
												</Media>
												<Media body>
													<span className="lead">{symbol}</span>
													<small className="d-block">{ativos[symbol].quote.companyName}</small>
												</Media>
											</Media>
										</td>

										<td key={1} style={{ width: '25%', verticalAlign: 'middle' }}
											className={(ativos[symbol].quote.changePercent < 0 ? "text-danger" : "text-success") + " text-center"}>
											{formatterPercent.format(ativos[symbol].quote.changePercent)}
											<small className="d-block">({formatterPrice.format(ativos[symbol].quote.change)})</small>
										</td>

										<td key={2} className="text-center" style={{ width: '25%', verticalAlign: 'middle' }}>
											<Button color="light" type="button" className="btnprice"
												onClick={this.onClickRow(ativos[symbol])(cfdEnum.VENDER)}
												style={{ borderColor: '#e6e6e6' }}>
												<Badge color="primary" className="price">V</Badge>
												{formatterPrice.format(ativos[symbol].quote.iexBidPrice)}
											</Button>
										</td>

										<td key={3} className="text-center" style={{ width: '25%', verticalAlign: 'middle' }}>
											<Button color="light" type="button" className="btnprice"
												onClick={this.onClickRow(ativos[symbol])(cfdEnum.COMPRAR)}
												style={{ borderColor: '#e6e6e6' }}>
												<Badge color="primary" className="price">C</Badge>
												{formatterPrice.format(ativos[symbol].quote.iexAskPrice)}
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