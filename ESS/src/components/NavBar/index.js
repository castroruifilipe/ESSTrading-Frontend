import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class NavBar extends Component{
  render(){
    return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">ESS Trading</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end"id="navbarSupportedContent">
        <ul className="nav navbar-nav navbar-right">
          <li>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="procurar" aria-label="Search"/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </li>
          <li className="nav-item ">
            <Link to="/sobre" className="nav-link">Sobre</Link>
          </li>
          <li className="nav-item ">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="nav-item ">
            <Link to="/registar" className="nav-link">Registar</Link>
          </li>
        </ul>
      </div>
    </nav>
    );
  }


}
export default NavBar;
