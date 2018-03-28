import React, { Component } from 'react';

class ButaoVariacao extends Component{

  constructor(props) {
    super(props);
    this.state={
      variacaoAtual : '1H'
    }
  }


  changeVariacao(variacao){
  	if(this.state.variacaoAtual!==variacao){
  		this.setState({variacaoAtual: variacao});
      this.props.onChangeVariacao(variacao);
  	}
  }

  render(){

    return(
      <div className="dropdown text-center">
    		<button className="btn btn-light dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    			{'Variação '+this.state.variacaoAtual}
    		</button>
    		<div className="dropdown-menu" aria-labelledby="dropdownMenu2">
    			<button className="dropdown-item" type="button" onClick={()=>this.changeVariacao('1H')}>1H</button>
    			<button className="dropdown-item" type="button" onClick={()=>this.changeVariacao('4H')}>4H</button>
    			<button className="dropdown-item" type="button" onClick={()=>this.changeVariacao('1D')}>1D</button>
    		</div>
    	</div>
    )
  }

}

export default ButaoVariacao;
