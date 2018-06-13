import React, { Component } from 'react';

class BotaoVariacao extends Component {

	render() {
		return (
			<div className="dropdown text-center">
				<button className="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					{'Variação ' + this.props.variacaoAtual}
				</button>
				<div className="dropdown-menu" aria-labelledby="dropdownMenu2">
					<button className="dropdown-item" type="button" onClick={() => this.props.onChange('1d')}>1 dia</button>
					<button className="dropdown-item" type="button" onClick={() => this.props.onChange('1m')}>1 mês</button>
					<button className="dropdown-item" type="button" onClick={() => this.props.onChange('6m')}>6 meses</button>
					<button className="dropdown-item" type="button" onClick={() => this.props.onChange('1y')}>1 ano</button>
				</div>
			</div>
		)
	}

}

export default BotaoVariacao;
