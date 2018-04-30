import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import './style.css';

class AccountFooter extends Component {

    render() {
        return (
            <Row id="floatAccount" className="no-gutters text-center">
                <Col md='3'>
                    Saldo
                </Col>
                <Col md='3'>
                    Investido
                </Col>

                <Col md='3'>
                    PL
                </Col>
                <Col md='3'>
                    Total
                </Col>
            </Row>
        );
    }
}

export default AccountFooter;