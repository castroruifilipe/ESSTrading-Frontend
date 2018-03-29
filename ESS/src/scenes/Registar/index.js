import React, { Component } from 'react';
import { auth } from '../../firebase';
import { withRouter } from 'react-router-dom';
import Modal from '../../components/Modal';

import * as routes from '../../constants/routes';

import './style.css';


const INITIAL_STATE = {
	showModal: false,
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
	}


	onClickModal = () => {
		this.props.history.push(routes.HOME);
	}

	toggleModal = () => {
		this.setState({
			showModal: !this.state.showModal
		});
	}

	onSubmit = (event) => {
		const {
			username,
			email,
			password_one,
		} = this.state;

		auth.doCreateUserWithEmailAndPassword(email, password_one)
			.then(authUser => {
				this.setState(() => ({ ...INITIAL_STATE }));
				auth.sendEmailVerification().then(() => {
					this.toggleModal();
				}).catch(error => {
					this.setState({
						'error': error
					});
				})
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
				<form className="form-signin" onSubmit={this.onSubmit}>
					<h1 className="h3 mb-3 font-weight-normal">Criar conta</h1>

					<input
						value={first_name}
						onChange={event => this.setState({
							'first_name': event.target.value
						})}
						type="text"
						placeholder="Primeiro nome"
						className="form-control" required
					/>
					<input
						value={last_name}
						onChange={event => this.setState({
							'last_name': event.target.value
						})}
						type="text"
						placeholder="Último nome"
						className="form-control" required
					/>
					<input
						value={username}
						onChange={event => this.setState({
							'username': event.target.value
						})}
						type="text"
						placeholder="Username"
						className="form-control" required
					/>
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
						value={password_one}
						onChange={event => this.setState({
							'password_one': event.target.value
						})}
						type="password"
						placeholder="Password"
						className="form-control" required
					/>
					<input
						value={password_two}
						onChange={event => this.setState({
							'password_two': event.target.value
						})}
						type="password"
						placeholder="Confirmar password"
						className="form-control" required
					/>
					<input
						value={contacto}
						onChange={event => this.setState({
							'contacto': event.target.value
						})}
						type="tel"
						placeholder="Contacto"
						className="form-control"
					/>
					<button className="btn btn-lg btn-primary btn-block" disabled={isInvalid} type="submit">
						Criar conta
                	</button>

					{error && <p>{error.message}</p>}

					<Modal body="Enviamos-lhe um email de confimação. Por favor consulte a sua caixa de correio." buttonText="OK"
						show={this.state.showModal} onButtonClick={this.onClickModal} title="Email de confirmação" />

				</form >
			</div>
		);
	}
}


export default withRouter(Registar);