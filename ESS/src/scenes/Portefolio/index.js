import React, { Component } from 'react';
import { Table } from 'reactstrap';

import withAuthorization from '../../higher-order_components/withAuthorization';


class Portefolio extends Component {

    constructor(props) {
        super(props);
    }

    render() {
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
export default withAuthorization(authCondition)(Portefolio);
