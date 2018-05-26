import React, { Component } from 'react';
import { Row, Col, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import NumericInput from 'react-numeric-input';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { BarLoader } from 'react-spinners';
import axios from 'axios';


class DepositarPlafond extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    onChange = (valueAsNumber, valueAsString, input) => {
        this.setState({
            value: valueAsNumber,
        })
    }

    onSubmit = () => {
        const data = {
            valor: this.state.value
        }
        axios
            .put('http://localhost:9000/api/customers/depositarPlafond', { ...data }, {
                headers: { 'Authorization': 'Bearer ' + this.props.sessionStore.token }
            })
            .then(user => {
                this.props.sessionStore.setUser(user.data);
                this.props.toggle();
            })
            .catch(error => console.error(error));
    }

    render() {
        if (!this.props.sessionStore.user.saldo) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
                    <BarLoader height={7} width={200} color="white" />
                </div>
            );
        }

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
                    <Button color="primary" onClick={this.onSubmit}>Depositar</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default compose(
    inject('sessionStore'),
    observer
)(DepositarPlafond);