import React, { Component } from 'react';
import { Media, Table, Button, Badge } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

import withAtivos from '../../higher-order_components/withAtivos';
import ButaoVariacao from './components/ButaoVariacao';
import AtivosContext from '../../contexts/AtivosContext';
import AbrirCFD from '../../scenes/Watchlist/components/AbrirCFD';
import cfdEnum from '../../constants/cfdEnum';
import { formatterPercent, formatterPrice } from '../../constants/formatters';
import * as routes from '../../constants/routes';
import './style.css';


let ativoSelected = undefined;

class HomeTable extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			tipoCFD: undefined
		};

		this.toggle = this.toggle.bind(this);
	}

	toggle = () => {
		if (this.state.modal === true) {
			ativoSelected = undefined;
			this.setState({
				modal: !this.state.modal,
			});
		} else {
			this.setState({
				modal: !this.state.modal,
			});
		}
	}

	onClickRow = ativo => tipoCFD => event => {
		if (this.props.openCFD) {
			ativoSelected = ativo;
			this.setState({
				tipoCFD: tipoCFD,
			});
			this.toggle();
		} else {
			this.props.history.push(routes.LOGIN);
		}
	}

	updateAtivoSelected = (ativo) => {
		ativoSelected = ativo;
	}

	render() {
		return (
			<div>
				{ativoSelected !== undefined &&
					<AbrirCFD modal={this.state.modal} toggle={this.toggle} ativo={ativoSelected} tipoCFD={this.state.tipoCFD} />
				}
				<AtivosContext.Consumer >
					{ativos =>
						Object.keys(ativos).length !== 0 ? (
							<Table responsive >
								{ativoSelected ? this.updateAtivoSelected(ativos[ativoSelected.quote.symbol]) : null}
								<thead className="thead-light">
									<tr>
										<th key={0}>Mercados</th>
										<th key={1}><ButaoVariacao onChangeVariacao={(variacao) => this.changeVariacao(variacao)} /></th>
										<th key={2} className="text-center">Vender</th>
										<th key={3} className="text-center">Comprar</th>
									</tr>
								</thead>
								<tbody id="table">
									{Object.keys(ativos).map((symbol) =>
										<tr key={symbol}>
											<td key={0} style={{ width: '25%', verticalAlign: 'middle' }}>
												<Media>
													<Media left className="imgContainer">
														<Media className="logo" object src={ativos[symbol].logo} />
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
							</Table>
						) : (
								<div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '300px' }}>
									<BarLoader height={7} width={200} color="#4A90E2" />
								</div>
							)}

				</AtivosContext.Consumer >
			</div>
		);
	}
}

export default withAtivos(withRouter(HomeTable));