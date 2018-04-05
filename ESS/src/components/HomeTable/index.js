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
			rows: {'AMZN':{ativo: 'AMZN',variacao: '0.48%', venda: 1542.61, compra: 1545.74},
						 'AAPL':{ativo: 'AAPL', variacao: '-0.93%', venda: 174.67, compra: 175.01}
					 },
			activos: ["AMZN"],
		};


	}

	changeVariacao(variacao){
		console.log(variacao +' from HomeTable');
	}
	updateRows(){
		for(let i =0;i<this.state.activos.length;i++){
			fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=AMZN&apikey=63X9ZZK87B22O14G")
			.then(res => res.json())
      .then(
        (result) => {
          let n =result["Meta Data"]["1. Information"];
					let newState = Object.assign({},this.state.rows);
					this.setState({
						rows:{'AMZN':{ativo: n, variacao: n, venda: 174.67, compra: 175.01}},
					});

					alert(n);
        },
        (error) => {
          alert("error");
        }
      )
		}

	}

	render() {
		setTimeout(this.updateRows(),3000);

		return (
			<Table
				header={this.state.header}
				rows={this.state.rows}
				/>
		);
	}
}


export default HomeTable;
