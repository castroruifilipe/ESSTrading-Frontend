import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Container, Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';

import { auth } from '../../firebase';
import * as routes from '../../constants/routes';


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
					this.props.history.push(routes.WATCHLIST);
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
			<Container>
				<Row>
					<Col md={{ size: 6, offset: 3 }}>
						<h3 className="font-weight-normal mt-5 mb-3">Iniciar sessão</h3>

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
					</Col>
				</Row>
			</Container>
		);
	}
}


export default withRouter(Login);
