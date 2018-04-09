import React from 'react';
import { iex } from '../IEXClient';

import AtivosContext from '../contexts/AtivosContext';


const withAtivos = (Component) => {
    class WithAtivos extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                ativos: {
                    'AMZN' : {},
                    'AAPL' : {},
                    'FB' : {},
                    'GOOG' : {},
                    'TSLA' : {},
                    'DBX' : {},
                    'EA' : {},
                    'HPQ' : {},
                    'IBM' : {},
                    'MSFT' : {},
                    'MSI' : {},
                    'NOK' : {},
                    'NVDA' : {},
                    'ORCL' : {},
                    'SNAP' : {},
                    'SPOT' : {},
                    'TRIP' : {},
                }
            };
        }

        componentDidMount() {
            setInterval(this.updateAtivos, 3000);
        }

        updateAtivos = () => {
            const prevAtivos = this.state.ativos;
            Object.keys(this.state.ativos).forEach(symbol => {
                iex.stockQuote(symbol)
                    .then(quote => {
                        prevAtivos[symbol] = quote
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });

            this.setState({
                ativos: prevAtivos
            });
        }

        render() {
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