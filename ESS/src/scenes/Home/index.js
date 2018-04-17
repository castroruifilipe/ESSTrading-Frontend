import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import HomeTable from '../../components/HomeTable';
import Background from '../../images/trading.jpg';
import * as routes from '../../constants/routes';

class Home extends Component {

	render() {
		return (
			<div>
				<section className="showcase" style={{ marginBottom: '30px' }}>
					<div className="container-fluid p-0">
						<div className="row no-gutters">
							<div className="col-lg-12 order-lg-3 showcase-img"
								style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + Background + ')' }}>

								<div className="text-white col-lg-6" style={{ padding: '100px 30px 0px 100px', textShadow: '0 0 30px black' }}>
								<span id="logo-text" style={{fontWeight: 'bold', fontSize: '40px'}}>ESS Trading</span>
									<h1>Junte-se e ganhe dinheiro com confiança</h1>
									<span className="lead">
										Invista em centenas de ativos financeiros e <i>commodities</i> de forma fácil.
										Poderá ter total controlo sobre os seus negócios.
										</span>
									<Link to={routes.REGISTAR}>
										<Button style={{margin: '20px 0px 40px 0px'}} color="success" size="lg">
											REGISTAR
										</Button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>
				<div className="container">
					<HomeTable openCFD={false}/>
				</div>
			</div>
		);
	}
}


export default Home;
