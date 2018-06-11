import React, { Component } from 'react';
import { Alert, Row, Col, Media, Button, ButtonGroup, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import SwapIcon from 'react-icons/lib/md/swap-horiz';
import NumericInput from 'react-numeric-input';
import axios from 'axios';

import cfdEnum from '../../../../constants/cfdEnum';
import { formatterPrice, formatterPercent, formatterNumber } from '../../../../constants/formatters';
import unidadeEnum from '../../../../constants/unidadeEnum';


class AbrirCFD extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tipoCFD: props.tipoCFD,
            unidade: unidadeEnum.MONTANTE,
            error: undefined,
        };
    }

    onSwitchChange = () => {
        this.setState(prevState => ({
            tipoCFD: 1 - prevState.tipoCFD,
        }));
    }

    montante = 0;
    unidades = 0;
    preco = undefined;

    onChange = (valueAsNumber, valueAsString, input) => {
        if (this.state.unidade === unidadeEnum.MONTANTE) {
            this.montante = valueAsNumber;
        } else {
            this.unidades = valueAsNumber;
        }
        this.updateValues();
        this.setState({
            error: undefined,
        })
    }

    updateValues = () => {
        if (this.preco === 0 || !this.preco) {
            this.unidades = this.montante = 0;
        } else {
            if (this.state.unidade === unidadeEnum.MONTANTE) {
                this.unidades = this.montante / this.preco;
            } else {
                this.montante = this.unidades * this.preco;
            }
        }
    }

    convertUnidades = () => {
        this.updateValues();
        this.setState(prevState => ({
            unidade: 1 - prevState.unidade,
        }));
    }

    abrirCFD = () => {
        this.updateValues();
        if (this.props.sessionStore.user.saldo < this.montante) {
            this.setState({
                error: "O seu saldo é insuficiente para abrir este CFD."
            });
        } else {
            const data = {
                ativo: this.props.ativo,
                montante: this.montante,
                tipo: this.state.tipoCFD,
            }
            axios
                .post('http://essbackend.blurryface.pt/api/cfds/abrirCFD', { ...data }, {
                    headers: { 'Authorization': 'Bearer ' + this.props.sessionStore.token }
                })
                .then(response => {
                    this.props.cfdsStore.putCFD(response.data.cfd);
                    this.props.sessionStore.setSaldo(response.data.novoSaldo);
                    this.props.toggle();
                })
                .catch(error => {
                    if (error.response) {
                        this.setState({ "error": error.response.data.error.message })
                    } else {
                        console.error(error);
                    }
                });
        }
    }

    render() {
        let quote = this.props.ativosStore.quotes.get(this.props.ativo);

        let buttonGroup = undefined;
        let designacao = undefined;
        if (this.state.tipoCFD === cfdEnum.COMPRAR) {
            buttonGroup =
                <ButtonGroup className="btn-toggle">
                    <Button onClick={this.onSwitchChange} className="btn-default" color="primary" active>COMPRAR</Button>
                    <Button onClick={this.onSwitchChange}>VENDER</Button>
                </ButtonGroup>;
            designacao = 'COMPRAR';
            this.preco = quote.askPrice === null ? 0 : quote.askPrice;
        } else {
            buttonGroup =
                <ButtonGroup className="btn-toggle">
                    <Button onClick={this.onSwitchChange}>COMPRAR</Button>
                    <Button onClick={this.onSwitchChange} className="btn-default" color="primary" active>VENDER</Button>
                </ButtonGroup>;
            designacao = 'VENDER';
            this.preco = quote.bidPrice === null ? 0 : quote.bidPrice;
        }

        let value = this.montante;
        let buttonText = "UNIDADES";
        let labelText = "MONTANTE";
        if (this.state.unidade === unidadeEnum.UNIDADES) {
            value = this.unidades;
            buttonText = "MONTANTE";
            labelText = "UNIDADES";
        }

        this.updateValues();

        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalBody style={{ margin: '8px 5px' }}>
                    <div className="text-center">
                        {buttonGroup}
                    </div>
                    <hr style={{ padding: '3px' }} />
                    <Media>
                        <Media left className="imgContainer">
                            <Media className="logo" object src={this.props.ativosStore.logos.get(this.props.ativo)} />
                        </Media>
                        <Media body>
                            <span className="text-secondary">{designacao}</span>{' '}
                            <span className="text-primary">{quote.symbol}</span>
                            <span className="lead d-block">{formatterPrice.format(this.preco)}</span>
                            <div className={quote.changePercent < 0 ? "text-danger" : "text-success"}>
                                {formatterPercent.format(quote.changePercent)}{' '}
                                <small>({formatterPrice.format(quote.change)})</small>
                            </div>
                        </Media>
                    </Media>
                    <hr style={{ padding: '7px' }} />

                    <div className="container">
                        <Row className="align-items-center h-100">
                            <div className="col-md-3" >
                                <span>{labelText}</span>
                            </div>

                            <div className="col-md-5 col-md-offset-6">
                                <NumericInput mobile className="form-control"
                                    min={0} precision={2}
                                    value={value}
                                    onChange={this.onChange} />
                            </div>

                            <div className="col-md-4 text-center" >
                                <Button outline color="primary" onClick={(e) => this.convertUnidades(this.preco, e)} size="sm">
                                    <SwapIcon className="lead" />
                                    {buttonText}
                                </Button>
                            </div>
                        </Row>

                        <Row>
                            <Col md={{ size: 5, offset: 3 }} className="text-center pt-2">
                                <p>{this.state.unidade === unidadeEnum.MONTANTE ? formatterNumber.format(this.unidades) + " unidades" : formatterPrice.format(this.montante)}</p>
                            </Col>
                        </Row>
                    </div>

                    {this.state.error && <Alert className="mt-5" color="danger">{this.state.error}</Alert>}
                </ModalBody>
                <ModalFooter>
                    <Button block outline color="primary" size="lg" onClick={(e) => this.abrirCFD(this.preco, e)} >Abrir posição</Button>
                    <Button outline color="secondary" size="lg" onClick={this.props.toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default compose(
    inject('ativosStore', 'sessionStore', 'cfdsStore'),
    observer
)(AbrirCFD);