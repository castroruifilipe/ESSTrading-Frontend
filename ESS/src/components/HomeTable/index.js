import React, { Component } from 'react';
import { Media, Table, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import ChartistGraph from 'react-chartist';


import cfdEnum from '../../constants/cfdEnum';
import BotaoPreco from '../BotaoPreco';
import { withAtivos, getChartDatas } from '../../higher-order_components/withAtivos';
import BotaoVariacao from './components/BotaoVariacao';
import AbrirCFD from '../../scenes/Watchlist/components/AbrirCFD';
import { chartOptions } from '../../constants/chartOptions';
import { formatterPrice, formatterPercent } from '../../constants/formatters';
import './style.css';

let ativoSelected = undefined;


class HomeTable extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			tipoCFD: undefined,
			chartDatas: undefined,
			variacaoAtual: '1d',
		};
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

	onChangeVariacao = (variacao) => {
		if (this.state.variacaoAtual !== variacao) {
			getChartDatas(variacao).then(chartDatas => {
				this.setState({
					variacaoAtual: variacao,
					chartDatas,
				});
			});
		}
	}

	componentDidMount() {
		getChartDatas("1d").then(chartDatas => {
			this.setState({ chartDatas });
		});
	}

	makeRows = (rows) => {
		this.props.ativosStore.quotes.forEach((quote, symbol, map) => {
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

					<td key={symbol + "1"} style={{ width: '30%', verticalAlign: 'middle' }}
						className={(quote.changePercent < 0 ? "text-danger" : "text-success") + " text-center"}>
						<Row style={{ height: '100px' }}>
							<Col className="changeHidden pt-4">
								{formatterPercent.format(quote.changePercent)}
								<small className="d-block">({formatterPrice.format(quote.change)})</small>
							</Col>
							<Col>
								{(this.state.chartDatas
									? <ChartistGraph data={this.state.chartDatas[symbol]} type={'Line'} options={chartOptions} />
									:
									<div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
										<BarLoader height={4} width={200} color="#4A90E2" />
									</div>
								)}
							</Col>
						</Row>
					</td>

					<td key={symbol + "2"} className="text-center" style={{ width: '22.5%', verticalAlign: 'middle' }}>
						<BotaoPreco onClickRow={this.onClickRow} label="V" price="bidPrice" symbol={symbol} tipoCFD={cfdEnum.VENDER} />
					</td>

					<td key={symbol + "3"} className="text-center" style={{ width: '22.5%', verticalAlign: 'middle' }}>
						<BotaoPreco onClickRow={this.onClickRow} label="C" price="askPrice" symbol={symbol} tipoCFD={cfdEnum.COMPRAR} />
					</td>
				</tr>
			);
		});
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

				<Table responsive>
					<thead className="thead-light">
						<tr>
							<th key={0}><input className="form-control mr-sm-2" id="search" placeholder="procurar ativo" aria-label="Search" /></th>
							<th key={1}><BotaoVariacao onChange={this.onChangeVariacao} variacaoAtual={this.state.variacaoAtual} /></th>
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
