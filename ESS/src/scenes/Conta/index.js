import React, { Component } from 'react';
import PencilIcon from 'react-icons/lib/fa/edit'
import EraserIcon from 'react-icons/lib/fa/eraser'



class Conta extends Component {

    constructor(props) {
        super(props);


    }



    render() {
        return (
          <div>
            <h3>O meu perfil</h3>
            <hr></hr>
            <div className="row align-items-center">
              <div className="col-6">
                <div className="row align-items-center">
                  <div className="col-6">
                    <div className="ml-5 mt-4">
                      <img className="img-fluid rounded-circle mb-3" src={require("../../images/k1.png")} alt="Profile Picture"/>
                    </div>
                  </div>
                  <div className="col-6 text-left">
                    <h5>John Smith</h5>
                  </div>
                </div>
              </div>
              <div className="col-6 text-center">
                <div className="btn-group-vertical">
                  <button type="button" className="btn btn-primary mb-3">
                    < PencilIcon className="mr-1" />
                  Editar Dados
                </button>
                <button type="button" className="btn btn-danger">
                  < EraserIcon className="mr-1" />
                Apagar Conta
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-4 ml-3">
          <div className="col-4">
            <p><strong>Email</strong></p>
            <p><strong>Password</strong></p>
            <p><strong>Contacto</strong></p>
            <p><strong>Data de nascimento</strong></p>
            <p><strong>Sexo</strong></p>
            <p><strong>NIF</strong></p>
          </div>
          <div className="col-4">
            <p>smith@ess.pt</p>
            <p>************</p>
            <p>918888888</p>
            <p>25/05/1985</p>
            <p>Masculino</p>
            <p>123456789</p>
          </div>
        </div>
      </div>
        )
    }

}

export default Conta;
