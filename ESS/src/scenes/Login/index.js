import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { auth } from '../../firebase';

import * as routes from '../../constants/routes';

import './style.css';


const INITIAL_STATE = {
	email: '',
	password: '',
	error: null,
};

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}


	onSubmit = (event) => {
		const {
			email,
			password,
		} = this.state;

		auth.doSignInWithEmailAndPassword(email, password)
			.then(() => {
				this.setState(() => ({ ...INITIAL_STATE }));
				this.props.history.push(routes.HOME);
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

					{error && <p>{error.message}</p>}
				</form >
			</div>
		);
	}
}


export default withRouter(Login);