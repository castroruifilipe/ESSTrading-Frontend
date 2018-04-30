import React, { Component } from 'react';
import { Media, Table, Button, Badge } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import withAtivos from '../../higher-order_components/withAtivos';
import ButaoVariacao from './components/ButaoVariacao';
import AbrirCFD from '../../scenes/Watchlist/components/AbrirCFD';
import cfdEnum from '../../constants/cfdEnum';
import { formatterPercent, formatterPrice } from '../../constants/formatters';
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

	onClickRow = symbol => tipoCFD => event => {
		ativoSelected = symbol;
		this.setState({
			tipoCFD: tipoCFD,
		});
		this.toggle();
	}

	makeRows = (rows) => {
		this.props.ativosStore.quotes.forEach((quote, symbol, map) =>
			rows.push(
				<tr key={symbol}>
					<td key={symbol + "0"} style={{ width: '25%', verticalAlign: 'middle' }}>
						<Media>
							<Media left className="imgContainer">
								<Media className="logo" object src={this.props.ativosStore.logos.get(symbol)} />
							</Media>
							<Media body>
								<span className="lead">{symbol}</span>
								<small className="d-block">{quote.companyName}</small>
							</Media>
						</Media>
					</td>

					<td key={symbol + "1"} style={{ width: '25%', verticalAlign: 'middle' }}
						className={(quote.changePercent < 0 ? "text-danger" : "text-success") + " text-center"}>
						{formatterPercent.format(quote.changePercent)}
						<small className="d-block">({formatterPrice.format(quote.change)})</small>
					</td>

					<td key={symbol + "2"} className="text-center" style={{ width: '25%', verticalAlign: 'middle' }}>
						<Button color="light" type="button" className="btnprice"
							onClick={this.onClickRow(symbol)(cfdEnum.VENDER)}
							style={{ borderColor: '#e6e6e6' }}>
							<Badge color="primary" className="price">V</Badge>
							{formatterPrice.format(quote.iexBidPrice)}
						</Button>
					</td>

					<td key={symbol + "3"} className="text-center" style={{ width: '25%', verticalAlign: 'middle' }}>
						<Button color="light" type="button" className="btnprice"
							onClick={this.onClickRow(symbol)(cfdEnum.COMPRAR)}
							style={{ borderColor: '#e6e6e6' }}>
							<Badge color="primary" className="price">C</Badge>
							{formatterPrice.format(quote.iexAskPrice)}
						</Button>
					</td>
				</tr>
			)
		);
	}

	render() {
		if (!this.props.ativosStore.dataLoad) {
			return (
				<div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<BarLoader height={7} width={200} color="#4A90E2" />
				</div>
			);
		}

		let rows = [];
		this.makeRows(rows);

		return (
			<div>
				<Table responsive >
					<thead className="thead-light">
						<tr>
							<th key={0}><input className="form-control mr-sm-2" id="search" placeholder="procurar ativo" aria-label="Search" /></th>
							<th key={1}><ButaoVariacao onChangeVariacao={(variacao) => this.changeVariacao(variacao)} /></th>
							<th key={2} className="text-center">Vender</th>
							<th key={3} className="text-center">Comprar</th>
						</tr>
					</thead>
					<tbody id="table">
						{rows}
					</tbody>
				</Table>
				{ativoSelected !== undefined &&
					<AbrirCFD modal={this.state.modal} toggle={this.toggle} ativo={ativoSelected} tipoCFD={this.state.tipoCFD} />
				}
			</div>
		);
	}
}

export default compose(
	withAtivos,
	withRouter,
	inject('ativosStore'),
	observer
)(HomeTable);