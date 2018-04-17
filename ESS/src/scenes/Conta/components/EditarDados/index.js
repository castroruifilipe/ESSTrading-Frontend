import React, { Component } from 'react';
import { Row, Col, Container, Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { auth, db } from '../../../../firebase';


class EditarDados extends Component {

	constructor(props) {
		super(props);
		this.state = {
			first_name: props.sessionStore.userDB.first_name,
			last_name: props.sessionStore.userDB.last_name,
			username: props.sessionStore.userDB.username,
			email: props.sessionStore.authUser.email,
			contacto: props.sessionStore.userDB.contacto,
			error: null,
		};
	}

	onSubmit = (event) => {
		const {
			username,
			first_name,
			last_name,
			email,
			contacto,
			password_one,
		} = this.state;

		auth.doCreateUserWithEmailAndPassword(email, password_one)
			.then(authUser => {
				db.doCreateUser(authUser.uid, username, first_name, last_name, contacto)
					.then(() => {
						auth.sendEmailVerification()
							.then(() => this.toggle())
							.catch(error => console.error(error));
						auth.doSignOut();
					})
					.catch(error => console.error(error));
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
			contacto,
			error,
		} = this.state;

		const isInvalid =
			first_name === '' ||
			last_name === '' ||
			username === '' ||
			email === '';

		return (
			<Modal isOpen={this.props.modal} toggle={this.props.toggle}>
				<ModalHeader toggle={this.props.toggle}>Editar dados da conta</ModalHeader>
				<ModalBody>
					<Form className="form-sign">
						<div className="form-label-group">
							<Input required value={first_name} placeholder="Primeiro nome" type="text" className="form-control" id="inputFirstName"
								onChange={event => this.setState({
									'first_name': event.target.value
								})}
							/>
							<label htmlFor="inputFirstName">Primeiro nome</label>
						</div>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button outline color="primary">Guardar</Button>
					<Button outline color="secondary" onClick={this.props.toggle}>Cancelar</Button>
				</ModalFooter>
			</Modal>


		);
	}
}

export default compose(
	inject('sessionStore'),
	observer
)(EditarDados);