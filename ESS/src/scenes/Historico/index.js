import React, { Component } from 'react';
import { Table } from 'reactstrap';

import withAuthorization from '../../higher-order_components/withAuthorization';


class Historico extends Component {
    
    render() {
        return (
            <div>
                <Table responsive >
                    <thead className="thead-light">
                        <tr>
                            <th key={0}>Ativo</th>
                            <th key={1} className="text-center">Valor Investido</th>
                            <th key={2} className="text-center">Preço Abertura (€)</th>
                            <th key={3} className="text-center">Preço Fecho (€)</th>
                            <th key={4} className="text-center">Data Abertura</th>
                            <th key={5} className="text-center">Data Fecho</th>
                            <th key={6} className="text-center">Ganho/Perda (€)</th>
                            <th key={7} className="text-center">Ganho/Perda (%)</th>
                        </tr>
                    </thead>
                    <tbody id="table">
                        
                    </tbody>
                </Table>
            </div>
        );
    }

}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Historico);
