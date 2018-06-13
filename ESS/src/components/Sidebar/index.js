import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Media } from 'reactstrap';
import EyeIcon from 'react-icons/lib/md/remove-red-eye';
import BookIcon from 'react-icons/lib/fa/book';
import HistoryIcon from 'react-icons/lib/md/history';
import AddMoneyIcon from 'react-icons/lib/md/attach-money';
import CreditCardIcon from 'react-icons/lib/md/credit-card';
import SettingsIcon from 'react-icons/lib/md/settings';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { BarLoader } from 'react-spinners';

import * as routes from '../../constants/routes';
import './style.css';


class Sidebar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            hidded: false,
        };
    }

    updateDimensions() {
        if (!this.state.hidded) {
            if (window.innerWidth <= 1000) {
                this.setState({
                    active: true
                });
            } else {
                this.setState({
                    active: false
                });
            }
        }
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    toggle = () => {
        this.setState({
            active: !this.state.active,
            hidded: !this.state.hidded
        });
    }

    render() {
        let userMedia =
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
                <BarLoader height={7} width={200} color="white" />
            </div>
        if (this.props.sessionStore.user.imageCroped) {
            userMedia =
                <Media className="mt-2 mb-3">
                    <Media left className="imgContainer">
                        <Media className="userimg" object src={this.props.sessionStore.user.imageCroped} />
                    </Media>
                    <Media body className="hideOnActive">
                        <span className="d-block" style={{ margin: '10px 0px 4px 0px' }}>{this.props.sessionStore.user.first_name + " " + this.props.sessionStore.user.last_name}</span>
                        <small className="d-block">{this.props.sessionStore.user.username}</small>
                        <NavLink to={routes.CONTA}><small><u>O meu perfil</u></small></NavLink>
                    </Media>
                </Media >
        }

        return (
            <nav id="sidebar" className={this.state.active ? "active" : ""}>
                <div className="sidebar-header" style={{ height: '90px' }}>
                    {userMedia}
                </div >
                <ul className="list-unstyled components">
                    <li >
                        <NavLink to={routes.WATCHLIST} className="link">
                            <i><EyeIcon /> </i>Watchlist
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={routes.PORTEFOLIO} className="link">
                            <i><BookIcon /> </i>Portefólio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={routes.HISTORICO} className="link">
                            <i><HistoryIcon /> </i>Histórico
                        </NavLink>
                    </li>
                    <li style={{ cursor: 'pointer' }}>
                        <a className="link" onClick={this.props.toggleDepositar}>
                            <i><AddMoneyIcon /> </i>Depositar plafond
                        </a>
                    </li>
                    <li style={{ cursor: 'pointer' }}>
                        <a className="link" onClick={this.props.toggleLevantar}>
                            <i><CreditCardIcon /> </i>Levantar plafond
                        </a>
                    </li>
                    <li>
                        <NavLink to={routes.CONTA} className="link">
                            <i><SettingsIcon /> </i>Definições
                        </NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default compose(
    inject('sessionStore'),
    observer,
)(Sidebar);
