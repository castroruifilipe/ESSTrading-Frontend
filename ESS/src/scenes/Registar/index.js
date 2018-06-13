import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Container, Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';
import axios from 'axios';

import Footer from '../../components/Footer';
import * as routes from '../../constants/routes';


class Registar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			first_name: '',
			last_name: '',
			username: '',
			email: '',
			password_one: '',
			password_two: '',
			contacto: '',
			error: null,
		};
	}

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	}

	onButtonClickModal = () => {
		this.props.history.push(routes.LOGIN);
	}

	onSubmit = (event) => {
		const data = {
			username: this.state.username,
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			email: this.state.email,
			password: this.state.password_one,
			contacto: this.state.contacto,
		}
		axios.post('http://essbackend.blurryface.pt/api/customers/signup', { ...data })
			.then(response => this.toggle())
			.catch(error => {
				if (error.response) {
					this.setState({ "error": "Erro no registo"})
				} else {
					console.error(error.response);
				}
			});
		event.preventDefault();
	}

	render() {
		const {
			first_name,
			last_name,
			username,
			email,
			password_one,
			password_two,
			contacto,
			error,
		} = this.state;

		const isInvalid =
			password_one !== password_two ||
			password_one.length < 6 ||
			first_name === '' ||
			last_name === '' ||
			username === '' ||
			email === '' ||
			password_one === '';

		return (
			<Container fluid>
				<Row style={{ minHeight: '90vh' }}>
					<Col md={{ size: 6, offset: 4 }}>
						<h3 className="font-weight-normal mb-3" style={{ paddingTop: '120px' }}>Criar conta</h3>

						<Form className="form-sign" onSubmit={this.onSubmit}>
							<div className="form-label-group">
								<Input required value={first_name} placeholder="Primeiro nome" type="text" className="form-control" id="inputFirstName"
									onChange={event => this.setState({
										'first_name': event.target.value
									})}
								/>
								<label htmlFor="inputFirstName">Primeiro nome</label>
							</div>
							<div className="form-label-group">
								<Input required value={last_name} placeholder="Último nome" type="text" className="form-control" id="inputLastName"
									onChange={event => this.setState({
										'last_name': event.target.value
									})}
								/>
								<label htmlFor="inputLastName">Último nome</label>
							</div>
							<div className="form-label-group">
								<Input required value={username} placeholder="Username" type="text" className="form-control" id="inputUsername"
									onChange={event => this.setState({
										'username': event.target.value
									})}
								/>
								<label htmlFor="inputUsername">Username</label>
							</div>
							<div className="form-label-group">
								<Input required value={email} placeholder="Email" type="email" className="form-control" id="inputEmail"
									onChange={event => this.setState({
										'email': event.target.value
									})}
								/>
								<label htmlFor="inputEmail">Email</label>
							</div>
							<div className="form-label-group">
								<Input required value={password_one} placeholder="Password" type="password" className="form-control" id="inputPasswordOne"
									onChange={event => this.setState({
										'password_one': event.target.value
									})}
								/>
								<label htmlFor="inputPasswordOne">Password</label>
							</div>
							<div className="form-label-group">
								<Input required value={password_two} placeholder="Confirmar password" type="password" className="form-control" id="inputPasswordTwo"
									onChange={event => this.setState({
										'password_two': event.target.value
									})}
								/>
								<label htmlFor="inputPasswordTwo">Confirmar password</label>
							</div>
							<div className="form-label-group">
								<Input value={contacto} placeholder="Contacto" type="tel" className="form-control" id="inputContacto"
									onChange={event => this.setState({
										'contacto': event.target.value
									})}
								/>
								<label htmlFor="inputContacto">Contacto</label>
							</div>

							<Button color="primary" disabled={isInvalid} type="submit" block={true} size="lg">Registar</Button>

							<small>A password deverá ter no mínimo 6 caracteres.</small>
							{error && <Alert color="danger" className="mt-5">{error}</Alert>}

							<Modal isOpen={this.state.modal} toggle={this.toggle}>
								<ModalHeader toggle={this.toggle}>Sucesso no registo</ModalHeader>
								<ModalBody>
									A sua conta foi registada com sucesso e já pode iniciar sessão. Bem-vindo!
          						</ModalBody>
								<ModalFooter>
									<Button color="primary" onClick={this.onButtonClickModal}>OK</Button>
								</ModalFooter>
							</Modal>

						</Form >
					</Col>
				</Row>
				<Row>
					<Footer />
				</Row>
			</Container>
		);
	}
}


export default withRouter(Registar);