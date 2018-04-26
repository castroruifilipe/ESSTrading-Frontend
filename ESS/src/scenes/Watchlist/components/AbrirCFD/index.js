import React, { Component } from 'react';
import { Alert, Row, Media, Button, ButtonGroup, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import SwapIcon from 'react-icons/lib/md/swap-horiz';
import NumericInput from 'react-numeric-input';

import { db, auth } from '../../../../firebase';
import cfdEnum from '../../../../constants/cfdEnum';
import { formatterPrice, formatterPercent } from '../../../../constants/formatters';
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

    onChange = (valueAsNumber, valueAsString, input) => {
        if (this.state.unidade === unidadeEnum.MONTANTE) {
            this.montante = valueAsNumber;
        } else {
            this.unidades = valueAsNumber;
        }
        this.setState({
            error: undefined,
        })
    }

    updateValues = (preco) => {
        if (this.state.unidade === unidadeEnum.MONTANTE) {
            this.unidades = this.montante / preco;
        } else {
            this.montante = this.unidades * preco;
        }
    }

    convertUnidades = (preco) => {
        this.updateValues(preco);
        this.setState(prevState => ({
            unidade: 1 - prevState.unidade,
        }));
    }

    abrirCFD = (preco) => {
        this.updateValues(preco);
        if (this.props.sessionStore.userDB.saldo < this.montante) {
            this.setState({
                error: "O seu saldo é insuficiente para abrir este CFD."
            });
        } else {
            db.doAbrirCFD(auth.currentUser().uid, this.state.tipoCFD, this.props.ativo, this.unidades, this.montante, preco)
                .then(() => this.props.toggle())
                .catch(error => console.error(error));
        }
    }

    render() {
        let quote = this.props.ativosStore.quotes.get(this.props.ativo);

        let buttonGroup = undefined;
        let designacao = undefined;
        let preco = undefined;
        if (this.state.tipoCFD === cfdEnum.COMPRAR) {
            buttonGroup =
                <ButtonGroup className="btn-toggle">
                    <Button onClick={this.onSwitchChange} className="btn-default" color="primary" active>COMPRAR</Button>
                    <Button onClick={this.onSwitchChange}>VENDER</Button>
                </ButtonGroup>;
            designacao = 'COMPRAR';
            preco = quote.iexAskPrice;
        } else {
            buttonGroup =
                <ButtonGroup className="btn-toggle">
                    <Button onClick={this.onSwitchChange}>COMPRAR</Button>
                    <Button onClick={this.onSwitchChange} className="btn-default" color="primary" active>VENDER</Button>
                </ButtonGroup>;
            designacao = 'VENDER';
            preco = quote.iexBidPrice;
        }

        let value = this.montante;
        let buttonText = "UNIDADES";
        let labelText = "MONTANTE";
        if (this.state.unidade === unidadeEnum.UNIDADES) {
            value = this.unidades;
            buttonText = "MONTANTE";
            labelText = "UNIDADES";
        }

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
                            <span className="lead d-block">{formatterPrice.format(preco)}</span>
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
                                <Button outline color="primary" onClick={(e) => this.convertUnidades(preco, e)} size="sm">
                                    <SwapIcon className="lead" />
                                    {buttonText}
                                </Button>
                            </div>
                        </Row>
                    </div>

                    {this.state.error && <Alert className="mt-5" color="danger">{this.state.error}</Alert>}
                </ModalBody>
                <ModalFooter>
                    <Button block outline color="primary" size="lg" onClick={(e) => this.abrirCFD(preco, e)} >Abrir posição</Button>
                    <Button outline color="secondary" size="lg" onClick={this.props.toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default compose(
    inject('ativosStore', 'sessionStore'),
    observer
)(AbrirCFD);