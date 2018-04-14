import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HideIcon from 'react-icons/lib/fa/angle-left';
import ShowIcon from 'react-icons/lib/fa/angle-right';
import EyeIcon from 'react-icons/lib/md/remove-red-eye';
import BookIcon from 'react-icons/lib/fa/book';
import HistoryIcon from 'react-icons/lib/md/history';
import CreditCardIcon from 'react-icons/lib/md/credit-card';
import SettingsIcon from 'react-icons/lib/md/settings';
import * as routes from '../../constants/routes';

import './style.css';

class Sidebar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            hidded: false
        };

        this.toggle = this.toggle.bind(this);
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

    toggle() {
        this.setState({
            active: !this.state.active,
            hidded: !this.state.hidded
        });
    }

    render() {
        return (
            <nav id="sidebar" className={this.state.active ? "active" : ""}>
                <div className="sidebar-header">
                    user
                </div>

                <ul className="list-unstyled components">
                    <li className="active">
                        <Link to={routes.WATCHLIST}>
                            <i><EyeIcon /> </i>Watchlist
                        </Link>
                    </li>
                    <li>
                        <Link to={routes.WATCHLIST}>
                            <i><BookIcon /> </i>Portefólio
                        </Link>
                    </li>
                    <li>
                        <Link to={routes.WATCHLIST}>
                            <i><HistoryIcon /> </i>Histórico
                        </Link>
                    </li>
                    <li>
                        <Link to={routes.WATCHLIST}>
                            <i><CreditCardIcon /> </i>Levantar plafond
                        </Link>
                    </li>
                    <li>
                        <a href="#settingsSubmenu" data-toggle="collapse" aria-expanded="false">
                            <i><SettingsIcon /> </i>Definições
                        </a>
                        <ul className="collapse list-unstyled" id="settingsSubmenu">
                            <li><Link to={routes.WATCHLIST}>Geral</Link></li>
                            <li><Link to={routes.WATCHLIST}>Conta</Link></li>
                            <li><Link to={routes.WATCHLIST}>Notificações</Link></li>
                        </ul>
                    </li>

                </ul>

                <ul className="list-unstyled CTAs">
                    <li><a href="https://bootstrapious.com/tutorial/files/sidebar.zip" className="download">Download source</a></li>
                    <li><a href="https://bootstrapious.com/p/bootstrap-sidebar" className="article">Back to article</a></li>
                </ul>

                <ul className="list-unstyled">
                    <li onClick={this.toggle}>
                        {this.state.active ?
                            <a> <ShowIcon /> </a> :
                            <a> <HideIcon /> <small>Esconder</small> </a>}
                    </li>
                </ul>
            </nav>

        );
    }

}

export default Sidebar;