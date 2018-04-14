import React, { Component } from 'react';
import { Media, Button, ButtonGroup, Modal, ModalBody, ModalFooter } from 'reactstrap';

import withAuthorization from '../../../../higher-order_components/withAuthorization';
import * as routes from '../../../../constants/routes';
import cfdEnum from '../../../../constants/cfdEnum';
import { formatterPrice, formatterPercent } from '../../../../constants/formatters';
import Spinner from './components/Spinner';

class AbrirCFD extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tipoCFD: props.tipoCFD,
            precoVenda: props.ativo.quote.iexBidPrice,
            precoCompra: props.ativo.quote.iexAskPrice,
            changePercent: props.ativo.quote.changePercent,
            change: props.ativo.quote.change,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.ativo.quote.iexBidPrice !== prevState.precoVenda ||
            nextProps.ativo.quote.iexAskPrice !== prevState.precoCompra ||
            nextProps.ativo.quote.changePercent !== prevState.changePercent ||
            nextProps.ativo.quote.change !== prevState.change) {
            return ({
                precoVenda: nextProps.ativo.quote.iexBidPrice,
                precoCompra: nextProps.ativo.quote.iexAskPrice,
                changePercent: nextProps.ativo.quote.changePercent,
                change: nextProps.ativo.quote.change,
            });
        } else {
            return null;
        }
    }

    onSwitchChange = () => {
        this.setState(prevState => ({
            tipoCFD: 1 - prevState.tipoCFD,
        }));
    }


    render() {
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
            preco = this.state.precoCompra;
        } else {
            buttonGroup =
                <ButtonGroup className="btn-toggle">
                    <Button onClick={this.onSwitchChange}>COMPRAR</Button>
                    <Button onClick={this.onSwitchChange} className="btn-default" color="primary" active>VENDER</Button>
                </ButtonGroup>;
            designacao = 'VENDER';
            preco = this.state.precoVenda;
        }

        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalBody style={{margin: '0px 5px'}}>
                    <div className="text-center">
                        {buttonGroup}
                    </div>
                    <hr />
                    <Media>
                        <Media left className="imgContainer">
                            <Media className="logo" object src={this.props.ativo.logo} />
                        </Media>
                        <Media body>
                            <span className="text-secondary">{designacao}</span>{' '}
                            <span className="text-primary">{this.props.ativo.quote.symbol}</span>
                            <span className="lead d-block">{formatterPrice.format(preco)}</span>
                            <div className={this.state.changePercent < 0 ? "text-danger" : "text-success"}>
                                {formatterPercent.format(this.state.changePercent)}{' '}
                                <small>({formatterPrice.format(this.state.changePercent)})</small>
                            </div>
                        </Media>
                    </Media>
                    <hr />

                    <Spinner/>

                </ModalBody>
                <ModalFooter>
                    <Button block outline color="primary" size="lg" >Abrir posição</Button>
                    <Button outline color="secondary" size="lg" onClick={this.props.toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

// const authCondition = (authUser) => !!authUser;
// export default withAuthorization(authCondition)(AbrirCFD);

export default AbrirCFD;
