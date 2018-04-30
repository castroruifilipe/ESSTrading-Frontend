import React, { Component } from 'react';

import { Row, Col, Container } from 'reactstrap';
import Footer from '../../components/Footer';
import './style.css';

const sobreUrl = require("../../images/bg-showcase.jpg");
const diUrl = require("../../images/di.jpg");
const imageUrl = function (url) { return { backgroundImage: 'url(' + url + ')' } };

const k1Url = require("../../images/k1.png");
const k2Url = require("../../images/k2.jpg");
const k3Url = require("../../images/k3.jpg");
const k4Url = require("../../images/k4.jpg");

class Sobre extends Component {
	render() {
		return (
			<Container fluid style={{ paddingRight: '0', paddingLeft: '0' }}>
				<Row>
					<Col>
						<section className="showcase">
							<Row className="no-gutters">
								<div className="col-lg-6 order-lg-2 text-white showcase-img" style={imageUrl(diUrl)}></div>
								<div className="col-lg-6 order-lg-1 my-auto showcase-text">
									<h2>Projecto de Engenharia Web</h2>
									<p className="lead mb-0">Uma correctora online que permite aos utilizadores brincarem à compra e venda de CFDs!</p>
								</div>
							</Row>
							<Row className="no-gutters">
								<div className="col-lg-6 text-white showcase-img" style={imageUrl(sobreUrl)}></div>
								<div className="col-lg-6 my-auto showcase-text">
									<h2>Tecnologias</h2>
									<p className="lead mb-0">React, HTML, CSS, Javascript e Bootstrap.</p>
								</div>
							</Row>
						</section>

						<section className="testimonials text-center bg-light">
							<Container>
								<h2 className="mb-5">Developers</h2>
								<Row>
									<Col lg='3'>
										<div className="testimonial-item mx-auto mb-5 mb-lg-0">
											<img className="img-fluid rounded-circle mb-3" src={k1Url} alt="" />
											<h5>Diogo Machado</h5>
											<p className="font-weight-light mb-0">"Bla bla bla"</p>
										</div>
									</Col>
									<Col lg='3'>
										<div className="testimonial-item mx-auto mb-5 mb-lg-0">
											<img className="img-fluid rounded-circle mb-3" src={k2Url} alt="" />
											<h5>Miguel Matos</h5>
											<p className="font-weight-light mb-0">"Bla bla"</p>
										</div>
									</Col>
									<Col lg='3'>
										<div className="testimonial-item mx-auto mb-5 mb-lg-0">
											<img className="img-fluid rounded-circle mb-3" src={k3Url} alt="" />
											<h5>Rui Leite</h5>
											<p className="font-weight-light mb-0">"Bla"</p>
										</div>
									</Col>
									<Col lg='3'>
										<div className="testimonial-item mx-auto mb-5 mb-lg-0">
											<img className="img-fluid rounded-circle mb-3" src={k4Url} alt="" />
											<h5>Tiago Gomes</h5>
											<p className="font-weight-light mb-0">"Bla bla"</p>
										</div>
									</Col>
								</Row>
							</Container>
						</section>
					</Col>
				</Row>
				<Row>
					<Footer />
				</Row>
			</Container>
		);
	}

}

export default Sobre;
