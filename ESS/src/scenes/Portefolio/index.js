import React, { Component } from 'react';
import { Table, Media, Button, Badge } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { db, auth } from '../../firebase';
import withAuthorization from '../../higher-order_components/withAuthorization';
import { formatterPrice, formatterNumber } from '../../constants/formatters';
import cfdEnum  from '../../constants/cfdEnum';


class Portefolio extends Component {

    componentDidMount() {
        this.props.cfdsStore.updateCFDs();
    }

    fecharCFD = (cfd, lucro_perda) => {
        db.doFecharCFD(auth.currentUser().uid, cfd, lucro_perda);
    }

    makeRows = (rows) => {
        this.props.cfdsStore.CFDs.forEach((cfd, key, map) => {
            let quote = this.props.ativosStore.quotes.get(cfd.ativo);
            let precoAtual = quote.iexAskPrice;
            let label = "V";
            if (cfd.tipo === cfdEnum.COMPRAR) {
                precoAtual = quote.iexBidPrice;
                label = "C";
            }

            let lucro_perda = 0;
            rows.push(
                <tr key={key}>
                    <td key={key + "0"} style={{ width: '16,5%', verticalAlign: 'middle' }}>
                        <Media>
                            <Media left className="imgContainer">
                                <Media className="logo" object src={this.props.ativosStore.logos.get(cfd.ativo)} />
                            </Media>
                            <Media body>
                                <span className="lead">{quote.symbol}</span>
                                <small className="d-block">{quote.companyName}</small>
                            </Media>
                        </Media>
                    </td>

                    <td key={key + "1"} style={{ width: '16,5%', verticalAlign: 'middle' }} className="text-center">
                        {formatterNumber.format(cfd.unidades)}
                    </td>

                    <td key={key + "2"} style={{ width: '16,5%', verticalAlign: 'middle' }} className="text-center">
                        {formatterPrice.format(cfd.montante)}
                    </td>

                    <td key={key + "3"} style={{ width: '16,5%', verticalAlign: 'middle' }} className="text-center">
                        <Button color="light" className="btnprice" style={{ borderColor: '#e6e6e6', cursor: 'default' }}>
                            <Badge color="primary" className="price">{label}</Badge>
                            {formatterPrice.format(cfd.valorAbertura)}
                        </Button>
                    </td>

                    <td key={key + "4"} className="text-center" style={{ width: '16,5%', verticalAlign: 'middle' }}>
                        <Button color="light" className="btnprice" style={{ borderColor: '#e6e6e6', cursor: 'default' }}>
                            <Badge color="primary" className="price">P</Badge>
                            {formatterPrice.format(precoAtual)}
                        </Button>
                    </td>

                    <td key={key + "5"} className="text-center" style={{ width: '16,5%', verticalAlign: 'middle' }}>
                        <Button color="light" className="btnprice" style={{ borderColor: '#e6e6e6', cursor: 'default' }}>
                            <Badge color="primary" className="price">L/P</Badge>
                            {formatterPrice.format(quote.iexAskPrice)}
                        </Button>
                    </td>

                    <td key={key + "6"} className="text-center" style={{ width: '16,5%', verticalAlign: 'middle' }}>
                        <Button color="danger" onClick={(e) => {this.fecharCFD(key, lucro_perda, e)}}>
                            <b>X</b>
                        </Button>
                    </td>
                </tr>
            )
        }
        );

    }

    render() {
        let rows = [];
        this.makeRows(rows);

        if (rows.length === 0) {
            return (
                <div>
                    <p className="lead mt-5">Ainda não tem CFDs. Experimente comprar ou vender um ativo da sua Watchlist</p>
                </div>
            )
        }

        return (
            <div>
                <Table responsive >
                    <thead className="thead-light">
                        <tr>
                            <th key={0}>Ativo</th>
                            <th key={1} className="text-center">Unidades</th>
                            <th key={2} className="text-center">Montante</th>
                            <th key={3} className="text-center">Valor de Abertura</th>
                            <th key={4} className="text-center">Valor Atual</th>
                            <th key={5} className="text-center">Lucro/Perda</th>
                            <th key={6} className="text-center">Fechar</th>
                        </tr>
                    </thead>
                    <tbody id="table">
                        {rows}
                    </tbody>
                </Table>
            </div>
        );
    }

}

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    inject('cfdsStore', 'ativosStore'),
    observer
)(Portefolio);