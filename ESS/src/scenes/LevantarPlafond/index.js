import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


class LevantarPlafond extends Component {

    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalHeader>Levantar plafond</ModalHeader>
                <ModalBody>
                    Foi enviado um email de confirmação para. Verifique a sua caixa de correio.
          		</ModalBody>
                <ModalFooter>
                    <Button block outline color="primary" size="lg">Levantar</Button>
                    <Button outline color="secondary" size="lg" onClick={this.props.toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default LevantarPlafond;