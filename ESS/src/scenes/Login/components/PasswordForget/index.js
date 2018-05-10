import React, { Component } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input, Alert } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { auth } from '../../../../firebase';


class PasswordForget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailReset: '',
            first_name :'',
            error: null,
        };
    }

    onSubmit = () => {
        auth.doPasswordReset(this.state.emailReset)
            .then(() => {
                this.props.toggle();
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    render() {

        const isInvalid = this.state.email === '';

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Reposição da password</ModalHeader>
                <ModalBody className="center-block">
                    <Row className="ml-4 mr-4">
                        <Col>
                            <p>Insira o email para o qual deverá ser enviado o link para a reposição da password.</p>
                            <Form className="form-sign pt-3" onSubmit={this.onSubmit}>
                                <div className="form-label-group">
                                    <Input value={this.state.emailReset} placeholder="Email" type="text" className="form-control" id="inputEmailReset"
                                        onChange={event => this.setState({
                                            'emailReset': event.target.value
                                        })}
                                    />
                                    <label htmlFor="inputEmailReset">Email</label>
                                </div>
                            </Form>
                            {this.state.error && <Alert color="danger" className="mt-5">{this.state.error.message}</Alert>}
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" disabled={isInvalid} onClick={this.onSubmit}>Repor password</Button>
                    <Button outline color="secondary" onClick={this.props.toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>


        );
    }
}

export default compose(
    inject('sessionStore'),
    observer
)(PasswordForget);