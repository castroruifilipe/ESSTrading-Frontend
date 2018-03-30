import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../../firebase';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';

import * as routes from '../../constants/routes';

import './style.css';


const INITIAL_STATE = {
	modal: false,
	email: '',
	password: '',
	error: null,
};

class Login extends Component {

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

	onSubmit = (event) => {
		const {
			email,
			password,
		} = this.state;

		auth.doSignInWithEmailAndPassword(email, password)
			.then(() => {
				if (auth.emailVerified()) {
					this.setState(() => ({ ...INITIAL_STATE }));
					this.props.history.push(routes.HOME);
				} else {
					auth.doSignOut();
					this.toggle();
				}

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
			email,
			password,
			error,
		} = this.state;

		const isInvalid =
			password === '' ||
			email === '';

		return (
			<div>
				<Form className="form-signin" onSubmit={this.onSubmit}>

					<h1 className="h3 mb-3 font-weight-normal">Iniciar sessão</h1>

					<Input required value={email} placeholder="Email" type="email" class="form-control"
						onChange={event => this.setState({
							'email': event.target.value
						})}
					/>
					<Input required value={password} placeholder="Password" type="password" class="form-control"
						onChange={event => this.setState({
							'password': event.target.value
						})}
					/>

					<Button color="primary" disabled={isInvalid} type="submit" block="true" size="lg">Login</Button>

					{error && <Alert color="danger">{error.message}</Alert>}

					<Modal isOpen={this.state.modal} toggle={this.toggle}>
						<ModalHeader toggle={this.toggle}>Email de confirmação</ModalHeader>
						<ModalBody>
							O seu email ainda não está verificado. Por favor consulte a sua caixa de correio e valide a sua conta.
          				</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.toggle}>OK</Button>
						</ModalFooter>
					</Modal>

				</Form >
			</div>
		);
	}
}


export default withRouter(Login);