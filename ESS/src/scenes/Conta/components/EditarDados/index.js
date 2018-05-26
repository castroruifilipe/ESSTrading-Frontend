import React, { Component } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import axios from 'axios';
import Avatar from 'react-avatar-edit';

class EditarDados extends Component {

	constructor(props) {
		super(props);
		this.state = {
			image: props.sessionStore.user.image,
			imageCroped: props.sessionStore.user.imageCroped,
			first_name: props.sessionStore.user.first_name,
			last_name: props.sessionStore.user.last_name,
			username: props.sessionStore.user.username,
			email: props.sessionStore.user.email,
			contacto: (props.sessionStore.user.contacto || ""),
			data_nascimento: (props.sessionStore.user.data_nascimento || ""),
			sexo: (props.sessionStore.user.sexo || "Masculino"),
			nif: (props.sessionStore.user.nif || ""),
			error: null,
		};
	}

	onClose = () => {
		this.setState({ image: null })
	}

	onImageLoad = (image) => {
		this.setState({ image });
	}

	onCrop = (imageCroped) => {
		this.setState({ imageCroped })
	}

	onSubmit = () => {
		const data = {
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			username: this.state.username,
			contacto: this.state.contacto,
			image: this.state.image,
			imageCroped: this.state.imageCroped,
			data_nascimento: this.state.data_nascimento,
			sexo: this.state.sexo,
			nif: this.state.nif,
		}

		axios
			.put('http://localhost:9000/api/customers/updateProfile', { ...data }, {
				headers: { 'Authorization': 'Bearer ' + this.props.sessionStore.token }
			})
			.then(user => this.props.sessionStore.setUser(user.data))
			.then(() => this.props.toggle())
			.catch(error => console.error(error));
	}

	render() {
		const {
			first_name,
			last_name,
			username,
			email,
			contacto,
			sexo,
			data_nascimento,
			nif,
		} = this.state;

		const isInvalid =
			first_name === '' ||
			last_name === '' ||
			username === '' ||
			email === '';

		return (
			<Modal isOpen={this.props.modal} size='lg' toggle={this.props.toggle}>
				<ModalHeader toggle={this.props.toggle}>Editar dados da conta</ModalHeader>
				<ModalBody className="center-block">
					<Row className="ml-4 mr-4">
						<Col lg="3" className="mb-2">
							<Avatar
								width={150}
								height={150}
								cropRadius={300}
								onFileLoad={this.onImageLoad}
								onClose={this.onClose}
								onCrop={this.onCrop}
								src={this.state.image}
							/>
						</Col>
						<Col lg="9">
							<Form className="form-sign">
								<Row>
									<Col lg="6">
										<div className="form-label-group">
											<Input value={first_name} placeholder="Primeiro nome" type="text" className="form-control" id="inputFirstName"
												onChange={event => this.setState({
													'first_name': event.target.value
												})}
											/>
											<label htmlFor="inputFirstName">Primeiro nome</label>
										</div>
									</Col>
									<Col lg="6">
										<div className="form-label-group">
											<Input value={last_name} placeholder="Último nome" type="text" className="form-control" id="inputLastName"
												onChange={event => this.setState({
													'last_name': event.target.value
												})}
											/>
											<label htmlFor="inputLastName">Último nome</label>
										</div>
									</Col>
								</Row>


								<div className="form-label-group">
									<Input value={username} placeholder="Username" type="text" className="form-control" id="inputUsername"
										onChange={event => this.setState({
											'username': event.target.value
										})}
									/>
									<label htmlFor="inputUsername">Username</label>
								</div>
								<div className="form-label-group">
									<Input value={contacto} placeholder="Contacto" type="text" className="form-control" id="inputContacto"
										onChange={event => this.setState({
											'contacto': event.target.value
										})}
									/>
									<label htmlFor="inputContacto">Contacto</label>
								</div>

								<div className="form-label-group">
									<Input value={data_nascimento} placeholder="Data de Nascimento" type="text" className="form-control" id="inputDN"
										onChange={event => this.setState({
											'data_nascimento': event.target.value
										})}>
									</Input>
									<label htmlFor="inputDN">Data de Nascimento</label>
								</div>

								<div className="form-label-group">
									<Input value={nif} placeholder="NIF" type="text" className="form-control" id="inputNIF"
										onChange={event => this.setState({
											'nif': event.target.value
										})}
									/>
									<label htmlFor="inputNIF">NIF</label>
								</div>

								<div className="form-label-group">
									<Input value={sexo} placeholder="Sexo" type="select" className="form-control" id="inputSexo"
										onChange={event => this.setState({
											'sexo': event.target.value
										})}>
										<option>Masculino</option>
										<option>Feminino</option>
									</Input>
								</div>
							</Form>
						</Col>
					</Row>
				</ModalBody>
				<ModalFooter>
					<Button outline color="primary" disabled={isInvalid} onClick={this.onSubmit}>Guardar</Button>
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