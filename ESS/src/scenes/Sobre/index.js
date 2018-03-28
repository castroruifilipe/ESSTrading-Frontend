import React, { Component } from 'react';
import './style.css';
const sobreUrl =require("../../images/bg-showcase.jpg");
const diUrl =require("../../images/di.jpg");
const imageUrl = function(url){return{backgroundImage: 'url(' + url + ')'}};

const k1Url =require("../../images/k1.png");
const k2Url =require("../../images/k2.jpg");
const k3Url =require("../../images/k3.jpg");
const k4Url =require("../../images/k4.jpg");

class Sobre extends Component {
  render(){
    return(
      <div >
        <section className="showcase">
          <div className="container-fluid p-0">
            <div className="row no-gutters">

              <div className="col-lg-6 order-lg-2 text-white showcase-img" style={imageUrl(diUrl)}></div>
              <div class="col-lg-6 order-lg-1 my-auto showcase-text">
                <h2>Projecto de Engenharia Web</h2>
                <p class="lead mb-0">Uma correctora online que permite aos utilizadores brincarem à compra e venda de CFDs!</p>
              </div>
            </div>
            <div className="row no-gutters">

              <div className="col-lg-6 text-white showcase-img" style={imageUrl(sobreUrl)}></div>
              <div class="col-lg-6 my-auto showcase-text">
                <h2>Tecnologias</h2>
                <p class="lead mb-0">React, HTML, CSS, Javascript e Bootstrap.</p>
              </div>
            </div>
          </div>
        </section>

        <section class="testimonials text-center bg-light">
          <div class="container">
            <h2 class="mb-5">Developers</h2>
            <div class="row">
              <div class="col-lg-3">
                <div class="testimonial-item mx-auto mb-5 mb-lg-0">
                  <img class="img-fluid rounded-circle mb-3" src={k1Url} alt=""/>
                  <h5>Diogo Machado</h5>
                  <p class="font-weight-light mb-0">"Bla bla bla"</p>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="testimonial-item mx-auto mb-5 mb-lg-0">
                  <img class="img-fluid rounded-circle mb-3" src={k2Url} alt=""/>
                  <h5>Miguel Matos</h5>
                  <p class="font-weight-light mb-0">"Bla bla"</p>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="testimonial-item mx-auto mb-5 mb-lg-0">
                  <img class="img-fluid rounded-circle mb-3" src={k3Url} alt=""/>
                  <h5>Rui Leite</h5>
                  <p class="font-weight-light mb-0">"Bla"</p>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="testimonial-item mx-auto mb-5 mb-lg-0">
                  <img class="img-fluid rounded-circle mb-3" src={k4Url} alt=""/>
                  <h5>Tiago Gomes</h5>
                  <p class="font-weight-light mb-0">"Bla bla"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        </div>
    );
  }

}

export default Sobre;
