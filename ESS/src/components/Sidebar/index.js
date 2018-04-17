import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Media } from 'reactstrap';
import HideIcon from 'react-icons/lib/fa/angle-left';
import ShowIcon from 'react-icons/lib/fa/angle-right';
import EyeIcon from 'react-icons/lib/md/remove-red-eye';
import BookIcon from 'react-icons/lib/fa/book';
import HistoryIcon from 'react-icons/lib/md/history';
import CreditCardIcon from 'react-icons/lib/md/credit-card';
import SettingsIcon from 'react-icons/lib/md/settings';
import UserImage from '../../images/user.png'

import { db, auth } from '../../firebase';
import * as routes from '../../constants/routes';
import './style.css';


class Sidebar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            hidded: false,
            user: undefined,
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
        db.onceGetUser(auth.currentUser().uid)
            .then((snapshot => {
                this.setState({
                    user: snapshot.val(),
                });
            }));
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
                    {this.state.user ? (
                        <Media className="mt-2">
                            <Media left className="imgContainer">
                                <Media className="userimg" object src={UserImage} />
                            </Media>
                            <Media body className="hideOnActive">
                                <span className="d-block" style={{ margin: '10px 0px 4px 0px' }}>{this.state.user.first_name + " " + this.state.user.last_name}</span>
                                <small className="d-block">{this.state.user.username}</small>
                            </Media>
                        </Media>
                    ) :
                        null
                    }
                </div>

                <ul className="list-unstyled components">
                    <li >
                        <NavLink to={routes.WATCHLIST} activeClassName="active" className="link">
                            <i><EyeIcon /> </i>Watchlist
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={routes.PORTEFOLIO} activeClassName="active" className="link">
                            <i><BookIcon /> </i>Portefólio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={routes.WATCHLIST} activeClassName="active" className="link">
                            <i><HistoryIcon /> </i>Histórico
                        </NavLink>
                    </li>
                    <li>
                        <a className="link" onClick={this.props.toggle}>
                            <i><CreditCardIcon /> </i>Levantar plafond
                        </a>
                    </li>
                    <li>
                        <a href="#settingsSubmenu" data-toggle="collapse" aria-expanded="false">
                            <i><SettingsIcon /> </i>Definições
                        </a>
                        <ul className="collapse list-unstyled" id="settingsSubmenu">
                            <li>
                                <NavLink to={routes.GERAL} activeClassName="active" className="link">
                                    Geral
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={routes.CONTA} activeClassName="active" className="link">
                                    Conta
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={routes.WATCHLIST} activeClassName="active" className="link">
                                    Notificações
                                </NavLink>
                            </li>
                        </ul>
                    </li>

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
