import React, { Component } from 'react';
import { auth, db } from '../../firebase';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Form, Input } from 'reactstrap';

import * as routes from '../../constants/routes';

import './style.css';


const INITIAL_STATE = {
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

class Registar extends Component {

	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };

		this.toggle = this.toggle.bind(this);
	}


	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	onButtonClickModal = () => {
		this.props.history.push(routes.LOGIN);
	}

	onSubmit = (event) => {
		const {
			email,
			password_one,
		} = this.state;

		auth.doCreateUserWithEmailAndPassword(email, password_one)
			.then(authUser => {
				db.doCreateUser(authUser.uid, this.state.username, this.state.email).
					then(() => {
						auth.sendEmailVerification().then(() => {
							this.toggle();
						}).catch(error => {
							this.setState({
								'error': error
							});
						})
					})
					.catch(error => {
						this.setState({
							'error': error,
						});
					});

				auth.doSignOut();

			})
			.catch(error => {
				this.setState({
					'error': error
				});
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
			first_name === '' ||
			last_name === '' ||
			username === '' ||
			email === '' ||
			password_one === '';

		return (
			<div>
				<Form className="form-signin" onSubmit={this.onSubmit}>
					<h1 className="h3 mb-3 font-weight-normal">Criar conta</h1>

					<Input required value={first_name} placeholder="Primeiro nome" type="text" class="form-control"
						onChange={event => this.setState({
							'first_name': event.target.value
						})}
					/>
					<Input required value={last_name} placeholder="Último nome" type="text" class="form-control"
						onChange={event => this.setState({
							'last_name': event.target.value
						})}
					/>
					<Input required value={username} placeholder="Username" type="text" class="form-control"
						onChange={event => this.setState({
							'username': event.target.value
						})}
					/>
					<Input required value={email} placeholder="Email" type="email" class="form-control"
						onChange={event => this.setState({
							'email': event.target.value
						})}
					/>
					<Input required value={password_one} placeholder="Password" type="password" class="form-control"
						onChange={event => this.setState({
							'password_one': event.target.value
						})}
					/>
					<Input required value={password_two} placeholder="Confirmar password" type="password" class="form-control"
						onChange={event => this.setState({
							'password_two': event.target.value
						})}
					/>
					<Input value={contacto} placeholder="Contacto" type="tel" class="form-control"
						onChange={event => this.setState({
							'contacto': event.target.value
						})}
					/>

					<Button color="primary" disabled={isInvalid} type="submit" block="true" size="lg">Registar</Button>

					{error && <Alert color="danger">{error.message}</Alert>}

					<Modal isOpen={this.state.modal} toggle={this.toggle}>
						<ModalHeader toggle={this.toggle}>Email de confirmação</ModalHeader>
						<ModalBody>
							Foi enviado um email de confirmação para {this.state.email}. Verifique a sua caixa de correio.
          				</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.onButtonClickModal}>OK</Button>
						</ModalFooter>
					</Modal>

				</Form >
			</div>
		);
	}
}


export default withRouter(Registar);