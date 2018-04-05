import React from 'react';

import AtivosContext from '../contexts/AtivosContext';
import { firebase } from '../firebase';


const ativos = {
    'AMZN': { variacao: '0.48%', venda: 1542.61, compra: 1545.74 },
	'AAPL': { variacao: '-0.93%', venda: 174.67, compra: 175.01 },
}

const withAtivos = (Component) => {
    class WithAtivos extends React.Component {

        constructor(props) {
            super(props);

            this.state = {
                ativos: ativos,
            };
        }

        updateAtivos() {
            for (let ativo in ativos) {
                fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + ativo + "&interval=1min$&apikey=63X9ZZK87B22O14G")
                    .then(res => res.json())
                    .then(result => {
                        let venda = result['Meta Data']['1. Information'];
                        this.setState(prevState => ({
                            ativos: {
                                ...prevState.ativos,
                                [ativo]: {variacao: "n", venda: 174.67, compra: 175.01 }
                            }
                        }));
                    }, error => {
                    });
            }
        }

        
        render() {
            setTimeout(() => this.updateAtivos(), 3000);

            return (
                <AtivosContext.Provider value={this.state.ativos}>
                    <Component />
                </AtivosContext.Provider>
            );
        }
    }

    return WithAtivos;
}

export default withAtivos;