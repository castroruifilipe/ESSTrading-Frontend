import React, { Component } from 'react';
import './style.css';

class Geral extends Component {
	constructor(props){
		super(props);
		this.state={
			estado: 'WhatchList', //criar contexto
		}
	}


	changeOption(option){

		this.setState({estado : option})

	}

	render() {

		return (
			<div className="row">
				<div className="col-3">
					<p>Janela de Início</p>
				</div>
				<div className="dropdown text-center col-9">
					<button className="btn btn-light dropdown-toggle drop"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						{this.state.estado}
					</button>
					<div className="dropdown-menu" aria-labelledby="dropdownMenu2">
						<button className="dropdown-item" type="button" onClick={()=> this.changeOption('WatchList')}>WatchList</button>
						<button className="dropdown-item" type="button" onClick={()=> this.changeOption('Portfólio')}>Portfólio</button>
						<button className="dropdown-item" type="button" onClick={()=> this.changeOption('Histórico')}>Histórico</button>
					</div>
				</div>
			</div>
		)
	}
}
export default Geral;
