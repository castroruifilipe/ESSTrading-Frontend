import React, { Component } from 'react';
import { Media, Button, ButtonGroup, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import cfdEnum from '../../../../constants/cfdEnum';
import { formatterPrice, formatterPercent } from '../../../../constants/formatters';
import Spinner from './components/Spinner';

class AbrirCFD extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tipoCFD: props.tipoCFD,
        };
    }

    onSwitchChange = () => {
        this.setState(prevState => ({
            tipoCFD: 1 - prevState.tipoCFD,
        }));
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

        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                <ModalBody style={{margin: '8px 5px'}}>
                    <div className="text-center">
                        {buttonGroup}
                    </div>
                    <hr style={{padding: '3px'}}/>
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
                    <hr style={{padding: '7px'}}/>

                    <Spinner preco={preco}/>

                </ModalBody>
                <ModalFooter>
                    <Button block outline color="primary" size="lg" >Abrir posição</Button>
                    <Button outline color="secondary" size="lg" onClick={this.props.toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default compose(
	inject('ativosStore'),
	observer
)(AbrirCFD);