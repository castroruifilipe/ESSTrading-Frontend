import React, { Component } from 'react';

import HomeTable from '../../components/HomeTable';
import Background from '../../images/trading.jpg';

class Home extends Component {

	render() {
		return (
			<div>
				{/* <div className="container" style={{backgroundImage: 'url(' + Background + ')', height: '100vh'}}>
				<h1>Ativos Financeiros</h1>
				</div>
					<HomeTable /> */}
				<div >
					<section className="showcase">
						<div className="container-fluid p-0">
							<div className="row no-gutters">
								<div className="col-lg-12 order-lg-3 showcase-img"
									style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + Background + ')' }}>
									<div className="text-white col-lg-5" style={{ padding: '100px 30px 0px 100px', textShadow: '0 0 30px black' }}>
										<h1>Junte-se e ganhe dinheiro com confiança</h1>
										<span className="lead">
											Invista em centenas de ativos financeiros e <i>commodities</i> de forma fácil.
											Poderá ter total controlo sobre os seus negócios.
										</span>
									</div>
								</div>

							</div>

						</div>
					</section>



				</div>
			</div>
		);
	}
}


export default Home;
