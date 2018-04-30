import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import Equals from 'react-icons/lib/ti/equals';

import cfdEnum from '../../constants/cfdEnum';
import { formatterPrice } from '../../constants/formatters';
import './style.css';

class AccountFooter extends Component {

    render() {

        let saldo=this.props.sessionStore.userDB.saldo
        let investido = 0, plAcumulado = 0;
        
        this.props.cfdsStore.CFDs.forEach((cfd, key, map) => {
            let quote = this.props.ativosStore.quotes.get(cfd.ativo);
            let precoAtual = quote.iexAskPrice === null ? 0 : quote.iexAskPrice;
            if (cfd.tipo === cfdEnum.COMPRAR) {
                precoAtual = quote.iexBidPrice === null ? 0 : quote.iexBidPrice;
            }

            investido += cfd.montante;
            plAcumulado += (precoAtual - cfd.valorAbertura)*cfd.unidades;
        });

        return (
            <Row className="floatAccount no-gutters text-center">
                <Col md='2'>
                    <p><strong>Saldo</strong></p>
                    <p>{formatterPrice.format(saldo)}</p>
                </Col>
                <Col md='1'>
                    <FaPlusCircle />
                </Col>
                <Col md='2'>
                    <p><strong>Investido</strong></p>
                    <p>{formatterPrice.format(investido)}</p>
                </Col>
                <Col md='1'>
                    <FaPlusCircle />
                </Col>
                <Col md='2'>
                    <p><strong>P/L</strong></p>
                    <p>{formatterPrice.format(plAcumulado)}</p>
                </Col>
                <Col md='1'>
                    <Equals />
                </Col>
                <Col md='2'>
                    <p><strong>Total</strong></p>
                    <p>{formatterPrice.format(saldo+investido)}</p>
                </Col>
            </Row>
        );
    }
}

export default compose(
    inject('sessionStore', 'cfdsStore','ativosStore'),
    observer
)(AccountFooter);