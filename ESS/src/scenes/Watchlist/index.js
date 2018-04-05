import React, { Component } from 'react';

import withAuthorization from '../../higher-order_components/withAuthorization';
import HomeTable from '../../components/HomeTable';
import './style.css';


class Watchlist extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false,
        };
    }



    render() {
        return (
            <HomeTable />
        );
    }

}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Watchlist);
