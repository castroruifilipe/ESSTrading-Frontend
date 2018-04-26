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
            <Container>
                <Row className="justify-content-center ">
                    <Col className="col-4" >
                        <Row className="mt-2 justify-content-center">
                            <h3>Adicionar Plafond</h3>
                        </Row>
                        <Row className="mt-2 justify-content-center">
                            <Col>
                                <NumericInput id="input" mobile className="form-control"
                                    min={0} precision={2}
                                    value={this.state.value}
                                    onChange={this.onChange} />
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col>
                                <Button onClick={this.addMoney} className="text-center col-12 mt-2" color="primary" disabled={this.state.value < 0 ? true : false}>Adicionar</Button>
                            </Col>
                        </Row>
                        <Row className="text-center">
                            <Col>
                                {this.state.mens}
                            </Col>
                        </Row>
                    </Col>
                </Row>


            </Container>
        );
    }
}

export default compose(
    inject('sessionStore'),
    observer
)(AddMoney);