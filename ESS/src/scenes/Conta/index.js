import React, { Component } from 'react';
import { Row, Col, Container, Media, Table } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import PencilIcon from 'react-icons/lib/fa/edit';
import EraserIcon from 'react-icons/lib/fa/eraser';

import EditarDados from './components/EditarDados';
import ApagarConta from './components/ApagarConta';
import AlterarPassword from './components/AlterarPassword';
import './style.css';


class Conta extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modalEditarDados: false,
			modalApagarConta: false,
			modalPass: false,
		};
	}

	toggleEditarDados = () => {
		this.setState({
			modalEditarDados: !this.state.modalEditarDados,
		});
	}

	toggleApagarConta = () => {
		this.setState({
			modalApagarConta: !this.state.modalApagarConta,
		});
	}

	togglePass = () => {
		this.setState({
			modalPass: !this.state.modalPass,
		});
	}

	render() {
		let user = this.props.sessionStore.user;
		if (!user) {
			return null;
		}

		return (
			<Container id="contaContainer">
				<Row className="pt-5">
					<Col>
						<h3 className="mb-5">A minha conta</h3>
					</Col>
				</Row>
				<Row>
					<Col md="6">
						<Media>
							<Media left>
								<Media className="img-fluid rounded-circle" style={{ maxWidth: '150px' }} object src={user.imageCroped} />
							</Media>
							<Media body className="ml-5 mt-3">
								<span className="d-block lead">
									{user.first_name + " " + user.last_name}
								</span>
								<small className="d-block">{user.username}</small>
							</Media>
						</Media>
					</Col>
					<Col md="1">
						<button type="button" className="btn btn-primary mb-2" style={{ width: '180px' }} onClick={this.toggleEditarDados}>
							<PencilIcon className="mr-1" />
							Editar Dados
                		</button>
						<button type="button" className="btn btn-primary mb-2" style={{ width: '180px' }} onClick={this.togglePass}>
							<PencilIcon className="mr-1" />
							Alterar Password
                		</button>
						<button type="button" className="btn btn-danger" style={{ width: '180px' }} onClick={this.toggleApagarConta}>
							<EraserIcon className="mr-1" />
							Apagar Conta
              			</button>
					</Col>
				</Row>

				<Row className="mt-5">
					<Col md="8">
						<Table className="borderless">
							<tbody>
								<tr>
									<th>Email</th>
									<td>{user.email}</td>
								</tr>
								<tr>
									<th>Contacto</th>
									<td>{user.contacto}</td>
								</tr>
								<tr>
									<th>Data de nascimento</th>
									<td>{user.data_nascimento}</td>
								</tr>
								<tr>
									<th>Sexo</th>
									<td>{user.sexo}</td>
								</tr>
								<tr>
									<th>NIF</th>
									<td>{user.nif}</td>
								</tr>
							</tbody>
						</Table>
					</Col>
				</Row >

				<EditarDados modal={this.state.modalEditarDados} toggle={this.toggleEditarDados} />
				<ApagarConta modal={this.state.modalApagarConta} toggle={this.toggleApagarConta} />
				<AlterarPassword modal={this.state.modalPass} toggle={this.togglePass} />
			</Container >
		);
	}
}

export default compose(
	inject('sessionStore'),
	observer
)(Conta);