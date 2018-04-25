import React, { Component } from 'react';
import { Row, Col, Container, Media, Table } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import PencilIcon from 'react-icons/lib/fa/edit'
import EraserIcon from 'react-icons/lib/fa/eraser'

import EditarDados from './components/EditarDados';


class Conta extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modal: false,
		};

		this.toggle = this.toggle.bind(this);
	}

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
	}

	render() {
		let userDB = this.props.sessionStore.userDB;
		if (!userDB) {
			return null;
		}
		let authUser = this.props.sessionStore.authUser;

		return (
			<Container>
				<Row>
					<Col>
						<h3 className="mb-5">A minha conta</h3>
					</Col>
				</Row>
				<Row>
					<Col md="6">
						<Media>
							<Media left>
								<Media className="img-fluid rounded-circle" style={{ maxWidth: '150px' }} object src={userDB.image} />
							</Media>
							<Media body className="ml-5 mt-3">
								<span className="d-block lead">
									{userDB.first_name + " " + userDB.last_name}
								</span>
								<small className="d-block">{userDB.username}</small>
							</Media>
						</Media>
					</Col>
					<Col md="1">
						<div className="btn-group-vertical">
							<button type="button" className="btn btn-primary mb-3" onClick={this.toggle}>
								<PencilIcon className="mr-1" />
								Editar Dados
                			</button>
							<button type="button" className="btn btn-danger">
								<EraserIcon className="mr-1" />
								Apagar Conta
              				</button>
						</div>
					</Col>
				</Row>

				<Row className="mt-5">
					<Col md="8">
						<Table className="borderless">
							<tbody>
								<tr>
									<th>Email</th>
									<td>{authUser.email}</td>
								</tr>
								<tr>
									<th>Contacto</th>
									<td>{userDB.contacto}</td>
								</tr>
								<tr>
									<th>Data de nascimento</th>
									<td>{userDB.data_nascimento}</td>
								</tr>
								<tr>
									<th>Sexo</th>
									<td>{userDB.sexo}</td>
								</tr>
								<tr>
									<th>NIF</th>
									<td>{userDB.nif}</td>
								</tr>
							</tbody>
						</Table>
					</Col>
				</Row >

				<EditarDados modal={this.state.modal} toggle={this.toggle} />
			</Container >
		);
	}
}

export default compose(
	inject('sessionStore'),
	observer
)(Conta);