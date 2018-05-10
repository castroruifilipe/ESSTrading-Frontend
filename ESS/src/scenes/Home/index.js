import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';

import Background from '../../images/trading.jpg';
import * as routes from '../../constants/routes';

class Home extends Component {

	render() {
		return (
			<Container fluid style={{ paddingRight: '0', paddingLeft: '0' }}>
				<Row className="no-gutters">
					<Col>
						<section className="mb-0 showcase showcase-img" style={{
							height: '100vh',
							backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + Background + ')',
							alignItems: 'center',
							display: 'flex',
						}}>
							<div className="text-white col-lg-6" style={{ padding: '0px 60px', textShadow: '0 0 30px black' }}>
								<span id="logo-text" style={{ fontWeight: 'bold', fontSize: '40px' }}>
									ESS Trading
								</span>

								<h1>Junte-se e ganhe dinheiro com confiança</h1>
								<span className="lead">
									Invista em centenas de ativos financeiros e <i>commodities</i> de forma fácil.
									Poderá ter total controlo sobre os seus negócios.
								</span>

								<Link to={routes.REGISTAR}>
									<Button style={{ margin: '20px 0px 40px 0px' }} color="success" size="lg">
										REGISTAR
									</Button>
								</Link>
							</div>
						</section>
					</Col>
				</Row>
			</Container>
		);
	}
}


export default Home;
