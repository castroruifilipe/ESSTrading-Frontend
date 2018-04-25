import React, { Component } from 'react';
import { Row, Col , Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import Avatar from 'react-avatar-edit';

import { db } from '../../../../firebase';


class EditarDados extends Component {

	constructor(props) {
		super(props);
		this.state = {
			image: props.sessionStore.userDB.image,
			first_name: props.sessionStore.userDB.first_name,
			last_name: props.sessionStore.userDB.last_name,
			username: props.sessionStore.userDB.username,
			email: props.sessionStore.authUser.email,
			contacto: props.sessionStore.userDB.contacto,
			error: null,
		};

		this.onImageLoad = this.onImageLoad.bind(this)
		this.onClose = this.onClose.bind(this)
	}

	onClose() {
		this.setState({ image: null })
	}

	onImageLoad(image) {
		this.setState({ image });
	}

	onSubmit = () => {
		const {
			first_name,
			last_name,
			username,
			email,
			contacto,
			image,
		} = this.state;
		db.doUpdateUser(this.props.sessionStore.authUser.uid, username, first_name, last_name, contacto, image)
			.then(() => this.props.toggle());
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
				<ModalBody className="center-block">
					<Row className="mb-3">
						<Col sm={{ size: 10, offset: 1 }}>
							<Row>
								<Col size="6">
									<span>Foto de perfil</span>
								</Col>
								<Col size="6">
									<Avatar
										width={150}
										height={150}
										cropRadius={300}
										onFileLoad={this.onImageLoad}
										onClose={this.onClose}
										onCrop={this.onImageLoad}
										src={this.state.image}
									/>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col sm={{ size: 10, offset: 1 }}>
							<Form className="form-sign">
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
									<Input required value={last_name} placeholder="Username" type="text" className="form-control" id="inputUsername"
										onChange={event => this.setState({
											'username': event.target.value
										})}
									/>
									<label htmlFor="inputUsername">Username</label>
								</div>

								<div className="form-label-group">
									<Input required value={email} placeholder="Email" type="text" className="form-control" id="inputEmail"
										onChange={event => this.setState({
											'email': event.target.value
										})}
									/>
									<label htmlFor="inputEmail">Email</label>
								</div>

								<div className="form-label-group">
									<Input required value={contacto} placeholder="Contacto" type="text" className="form-control" id="inputContacto"
										onChange={event => this.setState({
											'contacto': event.target.value
										})}
									/>
									<label htmlFor="inputContacto">Contacto</label>
								</div>
							</Form>
						</Col>
					</Row>
				</ModalBody>
				<ModalFooter>
					<Button outline color="primary" onClick={this.onSubmit}>Guardar</Button>
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