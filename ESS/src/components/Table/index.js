import React, { Component } from 'react';



class Table extends Component {

	getRows(row){
		return Object.values(row).map((elem,i) => <td key={i}>{elem}</td>);
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
					{this.props.rows.map((row,i) => <tr key={i}>{this.getRows(row)}</tr>)}
			  </tbody>
			</table>
		);
	}
}


export default Table;
