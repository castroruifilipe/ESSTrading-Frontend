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

const HTML = require("../../images/html5.jpg");
const CSS = require("../../images/CSS.3.svg.png");
const JS = require("../../images/javascript.png");
const BootstrapLogo = require("../../images/bootstrap.jpg");
const FireBaseLogo = require("../../images/firebase.png");
const ReactLogo = require("../../images/react.jpg");


class Sobre extends Component {

	render() {
		return (
			<Container fluid style={{ paddingRight: '0', paddingLeft: '0' }}>
				<div>
					<div>
						<section className="showcase">
							<Row className="no-gutters">
								<div className="col-lg-6 order-lg-2 text-white showcase-img" style={imageUrl(diUrl)}></div>
								<div className="col-lg-6 order-lg-1 my-auto showcase-text">
									<h2 className="pb-3">Projecto de Engenharia Web</h2>
									<p className="lead mb-0 text-justify">
										A ESS Online Trading Platform é uma plataforma de negociação que permite a investidores e
										traders abrir, fechar e gerir posições no mercado finaneiro, envolvendo a compra a e venda
										de ativos financeiros, nomeadamente a compra de ações, commodities, índices e moedas.
									</p>
								</div>
							</Row>
							<Row className="no-gutters">
								<div className="col-lg-6 text-white showcase-img" style={imageUrl(sobreUrl)}></div>
								<div className="col-lg-6 my-auto showcase-text" style={{ padding: '70px 70px' }}>
									<h2>Tecnologias</h2>
									<p className="lead"> HTML, CSS, Javascript, React, Bootstrap e Firebase.</p>
									<Row>
										<Col className="py-3">
											<img src={HTML} alt="HTML5" style={{ width: '100%' }} />
										</Col>
										<Col className="py-3">
											<img src={CSS} alt="CSS3" style={{ width: '100%' }} />
										</Col>
										<Col className="py-3">
											<img src={JS} alt="JS" style={{ width: '100%' }} />
										</Col>
									</Row>
									<Row>
										<Col className="py-3">
											<img src={BootstrapLogo} alt="Bootstrap" style={{ width: '100%' }} />
										</Col>
										<Col className="py-3">
											<img src={ReactLogo} alt="React" style={{ width: '100%' }} />
										</Col>
										<Col md={{ offset: 1 }} className="py-3">
											<img src={FireBaseLogo} alt="Firebase" style={{ maxWidth: '173px', maxHeight: '150px' }} />
										</Col>
									</Row>

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
										</div>
									</Col>
									<Col lg='3'>
										<div className="testimonial-item mx-auto mb-5 mb-lg-0">
											<img className="img-fluid rounded-circle mb-3" src={k2Url} alt="" />
											<h5>Miguel Matos</h5>
										</div>
									</Col>
									<Col lg='3'>
										<div className="testimonial-item mx-auto mb-5 mb-lg-0">
											<img className="img-fluid rounded-circle mb-3" src={k3Url} alt="" />
											<h5>Rui Leite</h5>
										</div>
									</Col>
									<Col lg='3'>
										<div className="testimonial-item mx-auto mb-5 mb-lg-0">
											<img className="img-fluid rounded-circle mb-3" src={k4Url} alt="" />
											<h5>Tiago Gomes</h5>
										</div>
									</Col>
								</Row>
							</Container>
						</section>
					</div>
				</div>
				<Footer />
			</Container>
		);
	}
}

export default Sobre;
