import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { withRouter } from 'react-router-dom';
import * as routes from '../../constants/routes';


class AbrirCFD extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    onButtonClickModal = () => {
        this.props.history.push(routes.LOGIN);
    }

    render() {
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Email de confirmação</ModalHeader>
                <ModalBody>
                    Foi enviado um email de confirmação para {this.state.email}. Verifique a sua caixa de correio.
          				</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onButtonClickModal}>OK</Button>
                </ModalFooter>
            </Modal>
        );
    }
}


export default AbrirCFD;
