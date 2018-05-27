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
        if (!this.props.sessionStore.user.saldo) {
            return null;
        }
        let saldo = this.props.sessionStore.user.saldo;
        let investido = 0, plAcumulado = 0;

        this.props.cfdsStore.CFDs.forEach((cfd, key, map) => {
            let quote = this.props.ativosStore.quotes.get(cfd.ativo);
            if (quote) {
                let precoAtual = quote.askPrice;
                if (cfd.tipo === cfdEnum.COMPRAR) {
                    precoAtual = quote.bidPrice;
                }

                investido += cfd.montante;
                plAcumulado += (precoAtual - cfd.valorAbertura) * cfd.unidades;
            }
        });

        return (
            <Row className="floatAccount no-gutters text-center" >
                <Col md='2' className="saldoHidden">
                    <p><strong>Saldo</strong></p>
                    <p>{formatterPrice.format(saldo)}</p>
                </Col>
                <Col md='1' className="saldoHidden">
                    <FaPlusCircle />
                </Col>
                <Col md='2' className="saldoHidden">
                    <p><strong>Investido</strong></p>
                    <p>{formatterPrice.format(investido)}</p>
                </Col>
                <Col md='1' className="saldoHidden">
                    <FaPlusCircle />
                </Col>
                <Col md='2' className="saldoHidden">
                    <p><strong>P/L</strong></p>
                    <p>{formatterPrice.format(plAcumulado)}</p>
                </Col>
                <Col md='1' className="saldoHidden">
                    <Equals />
                </Col>
                <Col>
                    <p><strong>Total</strong></p>
                    <p>{formatterPrice.format(saldo + investido + plAcumulado)}</p>
                </Col>
            </Row>
        );
    }
}

export default compose(
    inject('sessionStore', 'cfdsStore', 'ativosStore'),
    observer
)(AccountFooter);