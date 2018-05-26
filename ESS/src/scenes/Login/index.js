import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Container, Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import axios from 'axios';

import Footer from '../../components/Footer';
import PasswordForget from './components/PasswordForget';
import * as routes from '../../constants/routes';


const INITIAL_STATE = {
	modalEmail: false,
	modalPassword: false,
	email: '',
	password: '',
	error: null,
};

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}

	toggleEmail = () => {
		this.setState({
			modalEmail: !this.state.modalEmail
		});
	}

	togglePassword = () => {
		this.setState({
			modalPassword: !this.state.modalPassword
		});
	}

	onSubmit = (event) => {
		if (this.state.modalEmail === true) return;

		let credentials = {
			email: this.state.email,
			password: this.state.password
		}
		axios.post('http://localhost:9000/api/customers/signin', { ...credentials })
			.then(response => this.props.sessionStore.setToken(response.data))
			.then(() => this.props.history.push(routes.WATCHLIST))
			.catch(error => {
				if (error.response) {
					this.setState({ "error": error.response.data.error.message })
				} else {
					console.error(error);
				}
			})


		// axios.post('http://localhost:9000/api/customers/signin', { ...credentials })
		// 	.then(response => auth.doSignInWithCustomToken(response.data))
		// 	.then(authUser => {
		// 		if (auth.emailVerified()) {
		// 			this.props.history.push(routes.WATCHLIST);
		// 		} else {
		// 			// ALTERAR
		// 			auth.doSignOut();
		// 			this.toggleEmail();
		// 		}
		// 	})
		// 	.catch(error => {
		// 		if (error.response) {
		// 			this.setState({ "error": error.response.data.error.message })
		// 		} else {
		// 			console.error(error);
		// 		}
		// 	});
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
			<Container fluid >
				<Row style={{ minHeight: '90vh' }}>
					<Col md={{ size: 6, offset: 4 }}>
						<h3 className="font-weight-normal mt-5 mb-3" style={{ paddingTop: '90px' }}>Iniciar sessão</h3>

						<Form className="form-sign" onSubmit={this.onSubmit}>
							<div className="form-label-group">
								<Input required value={email} placeholder="Email" type="email" className="form-control" id="inputEmail"
									onChange={event => this.setState({
										'email': event.target.value
									})}
								/>
								<label htmlFor="inputEmail">Email</label>
							</div>

							<div className="form-label-group">
								<Input required value={password} placeholder="Password" type="password" className="form-control" id="inputPassword"
									onChange={event => this.setState({
										'password': event.target.value
									})}
								/>
								<label htmlFor="inputPassword">Password</label>
							</div>

							<Button color="primary" disabled={isInvalid} type="submit" block={true} size="lg">Login</Button>
							<div className="pt-3">
								<a className="text-primary" style={{ cursor: 'pointer' }} onClick={this.togglePassword}>
									Esqueceu-se da password?
								</a>
							</div>

							{error && <Alert color="danger" className="mt-5">{error}</Alert>}
							<Modal isOpen={this.state.modalEmail} toggle={this.toggleEmail}>
								<ModalHeader toggle={this.toggleEmail}>Email de confirmação</ModalHeader>
								<ModalBody>
									O seu email ainda não está verificado. Por favor consulte a sua caixa de correio e valide a sua conta.
          							</ModalBody>
								<ModalFooter>
									<Button color="primary" onClick={this.toggleEmail}>OK</Button>
								</ModalFooter>
							</Modal>

							<PasswordForget isOpen={this.state.modalPassword} toggle={this.togglePassword} />

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

export default compose(
	withRouter,
	inject('sessionStore'),
	observer
)(Login);
