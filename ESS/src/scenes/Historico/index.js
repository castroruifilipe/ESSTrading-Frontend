import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { formatterPrice, formatterNumber, formatterPercent } from '../../constants/formatters';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import AccountFooter from '../../components/AccountFooter';
import withAuthorization from '../../higher-order_components/withAuthorization';


class Historico extends Component {

    componentDidMount() {
        this.props.historyStore.updateMovs();
    }


    makeRows = (rows) => {
        this.props.historyStore.movs.forEach((mov, key, map) => {
            rows.push(
                <tr key={key}>
                    <td key={key + "0"} style={{ width: '12,5%', verticalAlign: 'middle' }}>
                        {mov.designacao}
                    </td>

                    <td key={key + "1"} style={{ width: '12,5%', verticalAlign: 'middle' }} className="text-center">
                        {formatterNumber.format(mov.valorInvestido)}
                    </td>

                    <td key={key + "2"} style={{ width: '12,5%', verticalAlign: 'middle' }} className="text-center">
                        {formatterPrice.format(mov.valorAbertura)}
                    </td>

                    <td key={key + "3"} style={{ width: '12,5%', verticalAlign: 'middle' }} className="text-center">
                        {formatterPrice.format(mov.precoFecho)}
                    </td>

                    <td key={key + "4"} className="text-center" style={{ width: '12,5%', verticalAlign: 'middle' }}>
                        {mov.dataAbertura}
                    </td>

                    <td key={key + "5"} className="text-center" style={{ width: '12,5%', verticalAlign: 'middle' }}>
                        {mov.dataFecho}
                    </td>

                    <td key={key + "6"} className="text-center" style={{ width: '12,5%', verticalAlign: 'middle' }}>
                        {formatterPrice.format(mov.lucroPerda)}
                    </td>
                    <td key={key + "7"} className="text-center" style={{ width: '12,5%', verticalAlign: 'middle' }}>
                        {formatterPercent.format(mov.percent_lucroPerda)}
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
                    <p className="lead pl-5 mt-5">Ainda não tem movimentos. Experimente fechar um CFD do seu Portefólio.</p>
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
                            <th key={1} className="text-center">Valor Investido</th>
                            <th key={2} className="text-center">Preço Abertura</th>
                            <th key={3} className="text-center">Preço Fecho</th>
                            <th key={4} className="text-center">Data Abertura</th>
                            <th key={5} className="text-center">Data Fecho</th>
                            <th key={6} className="text-center">Ganho/Perda</th>
                            <th key={7} className="text-center">Ganho/Perda</th>
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
    inject('historyStore'),
    observer
)(Historico);