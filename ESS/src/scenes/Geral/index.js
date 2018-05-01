import React, { Component } from 'react';
import { Row, Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Toggle from 'react-toggle';

import './style.css';

class Geral extends Component {
	constructor(props) {
		super(props);
		this.state = {
			estado: 'WhatchList',
			dropdownOpen: false,
			closeCFD: false,
			notify: false,
		}
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	}

	changeOption(option) {
		this.setState({ estado: option })
	}

	handleChangeCloseCFD() {
		this.setState({
			closeCFD: !this.state.closeCFD
		})
	}

	handleChangeNotify() {
		this.setState({
			notify: !this.state.notify
		})
	}

	render() {

		return (
			<div>
				<Row className='pt-5'>
					<Col md={{ size: 11, offset: 1 }}>
						<h3>Definições gerais</h3>
					</Col>
				</Row>
				<Row className='pt-3'>
					<Col md={{ size: 5, offset: 1 }}>
						<h6>Janela de Início</h6>
					</Col>
					<Col md='4' className="dropdown text-center ">
						<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
							<DropdownToggle caret color="primary">
								{this.state.estado}
							</DropdownToggle>
							<DropdownMenu>
								<DropdownItem onClick={() => this.changeOption('WatchList')}>WatchList</DropdownItem>
								<DropdownItem onClick={() => this.changeOption('Portfólio')}>Portfólio</DropdownItem>
								<DropdownItem onClick={() => this.changeOption('Histórico')}>Histórico</DropdownItem>
							</DropdownMenu>
						</ButtonDropdown>
					</Col>
				</Row>

				<Row className='pt-5'>
					<Col md={{ size: 11, offset: 1 }}>
						<h3>Definições das Notificações</h3>
					</Col>
				</Row>
				<Row className='pt-4'>
					<Col md={{ size: 5, offset: 1 }}>
						<h6>Notificar fecho de CFD</h6>
					</Col>
					<Col md='4' className="dropdown text-center ">
						<Toggle
							defaultChecked={this.state.closeCFD}
							icons={false}
							onChange={this.handleChangeCloseCFD} />
					</Col>
				</Row>
				<Row className='pt-4'>
					<Col md={{ size: 5, offset: 1 }}>
						<h6>Notificar por email</h6>
					</Col>
					<Col md='4' className="dropdown text-center ">
						<Toggle
							defaultChecked={this.state.notify}
							icons={false}
							onChange={this.handleChangeNotify} />
					</Col>
				</Row>
			</div>
		)
	}
}
export default Geral;
