import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../../firebase';
import Alert from '../../components/Alert';
import Modal from '../../components/Modal';

import * as routes from '../../constants/routes';

import './style.css';


const INITIAL_STATE = {
	showModal: false,
	email: '',
	password: '',
	error: null,
};

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}


	toggleModal = () => {
		this.setState({
			showModal: !this.state.showModal
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
					this.toggleModal();
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
				<form className="form-signin" onSubmit={this.onSubmit}>

					<h1 className="h3 mb-3 font-weight-normal">Iniciar sessão</h1>

					<input
						value={email}
						onChange={event => this.setState({
							'email': event.target.value
						})}
						type="email"
						placeholder="Email"
						className="form-control" required
					/>
					<input
						value={password}
						onChange={event => this.setState({
							'password': event.target.value
						})}
						type="password"
						placeholder="Password"
						className="form-control" required
					/>
					<button className="btn btn-lg btn-primary btn-block" disabled={isInvalid} type="submit">
						Login
                	</button>
					
					{error && <Alert alertType="danger" message={error.message} />}

					<Modal body="O seu email ainda não está verificado. Por favor consulte a sua caixa de correio e valide a sua conta." buttonText="OK"
						show={this.state.showModal} onButtonClick={this.toggleModal} title="Email de confirmação" />
					
				</form >
			</div>
		);
	}
}


export default withRouter(Login);