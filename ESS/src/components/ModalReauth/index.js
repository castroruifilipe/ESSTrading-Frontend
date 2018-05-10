import React, { Component } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, Alert } from 'reactstrap';
import * as firebase from 'firebase';

import { auth } from '../../firebase';


class ModalReauth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pass: '',
            error: null,
        };
    }

    doOperation = () => {
        let credential = firebase.auth.EmailAuthProvider.credential(auth.currentUser().email, this.state.pass)
        auth.doReauthenticateWithCredential(credential)
            .then(() => {
                this.props.operation();
            })
            .catch(error => {
                this.setState({
                    'error': error
                })
            })
    }

    render() {
        const isInvalid = this.state.pass === '';

        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Reautenticação</ModalHeader>
                <ModalBody className="center-block">
                    <Row className="ml-4 mr-4">
                        <Col>
                            <p>
                                A operação que está a fazer implica que volte a autenticar-se.
                                Insira a sua password para confirmar a operação.
                            </p>
                            <Form className="form-sign pt-3" onSubmit={this.onSubmit}>
                                <div className="form-label-group">
                                    <Input value={this.state.pass} placeholder="Password" type="password" className="form-control" id="inputPass"
                                        onChange={event => this.setState({
                                            'pass': event.target.value
                                        })}
                                    />
                                    <label htmlFor="inputPass">Password</label>
                                </div>
                            </Form>
                            {this.state.error && <Alert color="danger" className="mt-5">{this.state.error.message}</Alert>}
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" disabled={isInvalid} onClick={this.doOperation}>Confirmar</Button>
                    <Button outline color="secondary" onClick={this.props.toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>


        );
    }
}

export default ModalReauth;