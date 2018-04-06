import React from 'react';
import { IEXClient } from 'iex-api';

import AtivosContext from '../contexts/AtivosContext';

const ativos = {
    'AMZN': { variacao: '0.48%', venda: 1542.61, compra: 1545.74 },
    'AAPL': { variacao: '-0.93%', venda: 174.67, compra: 175.01 },
}

const fetch = window.fetch.bind(window);
const iex = new IEXClient(fetch);

const symbols = ['AMZN', 'AAPL', 'FB', 'GOOG', 'TSLA', 'DBX', 'EA', 'HPQ', 'IBM', 'MSFT', 'MSI', 'NOK', 'NVDA', 'ORCL', 'SNAP', 'SPOT', 'TRIP'];


const withAtivos = (Component) => {
    class WithAtivos extends React.Component {

        constructor(props) {
            super(props);

            this.state = {
                ativos: ativos,
            };
        }

        componentWillMount() {
            this.updateAtivos();
        }

        updateAtivos() {
            console.log("AQUI");
            const prevAtivos = this.state.ativos;
            symbols.forEach(symbol => {
                iex.stockQuote(symbol)
                    .then(quote => {
                        prevAtivos[symbol] = {
                            variacao: quote.changePercent,
                            venda: quote.iexBidPrice,
                            compra: quote.iexAskPrice
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });

            this.setState({
                ativos: prevAtivos
            });



            // fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols_join}types=change,ask,bid`)
            //     .then(res => res.json())
            //     .then(result => {
            //         console.log(result);




            //         // let venda = result['Meta Data']['1. Information'];
            //         // this.setState(prevState => ({
            //         //     ativos: {
            //         //         ...prevState.ativos,
            //         //         [ativo]: {variacao: "n", venda: 174.67, compra: 175.01 }
            //         //     }
            //         // }));
            //     }, error => {
            //     });
            // });
        }

        render() {
            console.log(this.state.ativos);
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