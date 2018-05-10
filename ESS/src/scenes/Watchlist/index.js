import React, { Component } from 'react';

import withAuthorization from '../../higher-order_components/withAuthorization';
import HomeTable from '../../components/HomeTable';
import AccountFooter from '../../components/AccountFooter';
import './style.css';


class Watchlist extends Component {

    render() {
        return (
            <div className="px-0 mx-0">
                <HomeTable />
                <AccountFooter />
            </div>
        );
    }

}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Watchlist);
