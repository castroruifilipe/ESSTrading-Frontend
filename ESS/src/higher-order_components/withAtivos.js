import React from 'react';
import { iex } from '../IEXClient';

import AtivosContext from '../contexts/AtivosContext';

let _timeout = undefined;

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
            this.updateAtivos();
            _timeout = setInterval(this.updateAtivos, 1000);
        }

        componentWillUnmount() {
            clearTimeout(_timeout);
        }

        updateAtivos = () => {
            const prevAtivos = this.state.ativos;
            Object.keys(this.state.ativos).forEach(symbol => {
                iex.stockQuote(symbol)
                    .then(quote => {
                        prevAtivos[symbol] = quote;
                    })
                    .catch(error => {
                        console.error(error);
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