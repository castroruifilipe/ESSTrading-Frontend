import React, { Component } from 'react';



class Table extends Component {

	getColumns(key){
		return Object.values(this.props.rows[key]).map((lm,i)=><td key={i} >{lm}</td>)

	}

	render() {

		return (
			<table className="table table-striped table-bordered">
			  <thead className="thead-light">
			    <tr>
						{this.props.header.map((elem,i) => <th key={i}>{elem}</th>)}
			    </tr>
			  </thead>
			  <tbody id="table">
					{Object.keys(this.props.rows).map((key,i) => <tr key={i}>{this.getColumns(key)}</tr>)}
			  </tbody>
			</table>
		);
	}
}


export default Table;
