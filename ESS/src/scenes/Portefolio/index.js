import React, { Component } from 'react';
import { Table, Media, Button, Badge } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import axios from 'axios';

import BotaoPreco from '../../components/BotaoPreco';
import withAuthorization from '../../higher-order_components/withAuthorization';
import { formatterPrice, formatterNumber, formatterPercent } from '../../constants/formatters';
import cfdEnum from '../../constants/cfdEnum';
import AccountFooter from '../../components/AccountFooter';


class Portefolio extends Component {

    fecharCFD = (id) => {
        axios
            .post('http://essbackend.blurryface.pt/api/cfds/fecharCFD', { cfd: id }, {
                headers: { 'Authorization': 'Bearer ' + this.props.sessionStore.token }
            })
            .then(response => {
                this.props.cfdsStore.removeCFD(id);
                this.props.historyStore.putMov(response.data.movimento);
                console.log(response);
                this.props.sessionStore.setSaldo(response.data.novoSaldo);
            })
            .catch(error => console.error(error));
    }

    makeRows = (rows) => {
        this.props.cfdsStore.CFDs.forEach((cfd, id, map) => {
            let quote = this.props.ativosStore.quotes.get(cfd.ativo);
            if (!quote) {
                return;
            }
            let precoAtual = quote.askPrice;
            let label = "Venda " + quote.symbol;
            let price = "askPrice";
            if (cfd.tipo === cfdEnum.COMPRAR) {
                price = "bidPrice";
                precoAtual = quote.bidPrice;
                label = "Compra " + quote.symbol;
            }

            let lucro_perda = (precoAtual - cfd.valorAbertura) * cfd.unidades;
            let percent_lucro_perda = (precoAtual === 0) ? 0 : ((precoAtual - cfd.valorAbertura) / precoAtual);

            rows.push(
                <tr key={id}>
                    <td key={id + "0"} style={{ width: '12,5%', verticalAlign: 'middle' }}>
                        <Media>
                            <Media left className="imgContainer">
                                <Media className="logo" object src={this.props.ativosStore.logos.get(cfd.ativo)} />
                            </Media>
                            <Media body>
                                <span className="lead">{label}</span>
                                <small className="d-block">{quote.companyName}</small>
                            </Media>
                        </Media>
                    </td>

                    <td key={id + "1"} style={{ width: '12,5%', verticalAlign: 'middle' }} className="text-center">
                        {formatterNumber.format(cfd.unidades)}
                    </td>

                    <td key={id + "2"} style={{ width: '12,5%', verticalAlign: 'middle' }} className="text-center">
                        {formatterPrice.format(cfd.valorAbertura)}
                    </td>

                    <td key={id + "3"} style={{ width: '12,5%', verticalAlign: 'middle' }} className="text-center">
                        {formatterPrice.format(cfd.montante)}
                    </td>

                    <td key={id + "4"} className="text-center" style={{ width: '12,5%', verticalAlign: 'middle' }}>
                        <BotaoPreco label="P" price={price} symbol={quote.symbol} cursor="default" />
                    </td>

                    <td key={id + "5"} className="text-center" style={{ width: '12,5%', verticalAlign: 'middle' }}>
                        <Button color="light" className="btnprice" style={{ width: '100%', borderColor: '#e6e6e6', cursor: 'default' }}>
                            <Badge color="primary" className="price">L/P</Badge>
                            {formatterPrice.format(lucro_perda)}
                        </Button>
                    </td>

                    <td key={id + "6"} className="text-center" style={{ width: '12,5%', verticalAlign: 'middle' }}>
                        <Button color="light" className="btnprice" style={{ width: '100%', borderColor: '#e6e6e6', cursor: 'default' }}>
                            <Badge color="primary" className="price">L/P</Badge>
                            {formatterPercent.format(percent_lucro_perda)}
                        </Button>
                    </td>

                    <td key={id + "7"} className="text-center" style={{ width: '12,5%', verticalAlign: 'middle' }}>
                        <Button color="danger" onClick={(e) => { this.fecharCFD(id, e) }}>
                            <b>X</b>
                        </Button>
                    </td>
                </tr>
            )
        });
    }

    render() {
        let rows = [];
        this.makeRows(rows);

        if (rows.length === 0) {
            return (
                <div>
                    <p className="lead pl-5 mt-5">Ainda não tem CFDs. Experimente comprar ou vender um ativo da sua Watchlist</p>
                    <AccountFooter />
                </div>
            )
        }

        return (
            <div>
                <Table responsive >
                    <thead className="thead-light">
                        <tr>
                            <th key={0} className="text-center">Ativo</th>
                            <th key={1} className="text-center">Unidades</th>
                            <th key={2} className="text-center">Valor de Abertura</th>
                            <th key={3} className="text-center">Valor Investido</th>
                            <th key={4} className="text-center">Valor Atual</th>
                            <th key={5} className="text-center">Lucro/Perda</th>
                            <th key={6} className="text-center">Lucro/Perda</th>
                            <th key={7} className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody id="table">
                        {rows}
                    </tbody>
                </Table>
                <AccountFooter />
            </div>
        );
    }
}

const authCondition = (authUser) => !!authUser;
export default compose(
    withAuthorization(authCondition),
    inject('cfdsStore', 'ativosStore', 'sessionStore', 'historyStore'),
    observer
)(Portefolio);