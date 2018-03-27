import React, { Component } from 'react';



class Table extends Component {

	getRows(row){
		return Object.values(row).map(elem => <td>{elem}</td>);
	}

	render() {
		return (
			<table className="table table-striped table-bordered">
			  <thead className="thead-light">
			    <tr>
						{this.props.header.map(elem => <th>{elem}</th>)}
			    </tr>
			  </thead>
			  <tbody id="table">
					{this.props.rows.map(row => <tr>{this.getRows(row)}</tr>)}
			  </tbody>
			</table>
		);
	}
}


export default Table;
