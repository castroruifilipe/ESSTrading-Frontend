import React, { Component } from 'react';
import { Row, Col, Container, Media, Table } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import PencilIcon from 'react-icons/lib/fa/edit';
import EraserIcon from 'react-icons/lib/fa/eraser';

import EditarDados from './components/EditarDados';
import ModalReauth from '../../components/ModalReauth';
import AlterarPassword from './components/AlterarPassword';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import './style.css';


class Conta extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			modalReauth: false,
			modalPass: false,
		};
	}

	toggle = () => {
		this.setState({
			modal: !this.state.modal,
		});
	}

	toggleReauth = () => {
		this.setState({
			modalReauth: !this.state.modalReauth,
		});
	}

	togglePass = () => {
		this.setState({
			modalPass: !this.state.modalPass,
		});
	}
	
	operation = () => {
		auth.doRemoveAccount()
			.then(() => {
				this.props.history.push(routes.HOME);
			})
			.catch(error => console.error(error))
	}

	render() {
		let userDB = this.props.sessionStore.userDB;
		if (!userDB) {
			return null;
		}

		let authUser = this.props.sessionStore.authUser;
		if (!authUser) {
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
								<Media className="img-fluid rounded-circle" style={{ maxWidth: '150px' }} object src={userDB.imageCroped} />
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
						
							<button type="button" className="btn btn-primary mb-2" style={{width: '180px'}} onClick={this.toggle}>
								<PencilIcon className="mr-1" />
								Editar Dados
                			</button>
							<button type="button" className="btn btn-primary mb-2" style={{width: '180px'}} onClick={this.togglePass}>
								<PencilIcon className="mr-1" />
								Alterar Password
                			</button>
							<button type="button" className="btn btn-danger" style={{width: '180px'}} onClick={this.toggleReauth}>
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

				<ModalReauth modal={this.state.modalReauth} toggle={this.toggleReauth} operation={this.operation} />

				<AlterarPassword modal={this.state.modalPass} toggle={this.togglePass} />
			</Container >
		);
	}
}

export default compose(
	inject('sessionStore'),
	observer
)(Conta);