import React, { Component } from 'react';
import { Row, Col, Button, Container, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import NumericInput from 'react-numeric-input';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { formatterPrice } from '../../constants/formatters';
import ReactDOM from 'react-dom';
import { db } from '../../firebase';

class AddMoney extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            mens: "",
        };
    }



    onChange = (valueAsNumber, valueAsString, input) => {
        this.setState({
            value: valueAsNumber,
            mens: "",
        })
    }


    addMoney = () => {
        let sucesso =
            <span className="mt-2 animated flash text-success">
                Adicionado com sucesso
        </span>;
        let erro =
            <span className="mt-2 animated shake text-danger">
                Valor não autorizado
        </span>;

        if (this.state.value > 0) {
            this.setState({
                mens: sucesso,
            });

            db.doUpdateSaldo(this.props.sessionStore.authUser.uid, this.props.sessionStore.userDB.saldo + this.state.value)
                .then(() => this.props.toggle())
                .catch(error => console.error(error));

        } else {
            this.setState({
                mens: erro,
            })
        }


    }

    render() {




        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} centered>
                <ModalHeader>Depositar plafond</ModalHeader>
                <ModalBody>
                    <Row className="text-center mb-4">
                        <Col>
                            <span>Introduza o montante que pretende depositar</span>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col sm={{ size: 6, offset: 3 }}>
                            <NumericInput mobile className="form-control"
                                min={0} precision={2}
                                value={this.state.value}
                                onChange={this.onChange} />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button outline color="secondary" onClick={this.props.toggle}>Cancelar</Button>
                    <Button color="primary"  onClick={this.onSubmit}>Depositar</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default compose(
    inject('sessionStore'),
    observer
)(AddMoney);