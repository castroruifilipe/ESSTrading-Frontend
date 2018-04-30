import React, { Component } from 'react';
import { Container } from 'reactstrap';

import withAuthorization from '../../higher-order_components/withAuthorization';
import HomeTable from '../../components/HomeTable';
import AccountFooter from '../../components/AccountFooter';
import './style.css';


class Watchlist extends Component {

    render() {
        return (
            <Container>
                <HomeTable />
                <AccountFooter />
            </Container>
        );
    }

}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Watchlist);
