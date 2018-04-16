import React from 'react';
import { iex } from '../IEXClient';

import AtivosContext from '../contexts/AtivosContext';


let symbols = ['AMZN', 'AAPL', 'FB', 'GOOG', 'TSLA', 'DBX', 'EA', 'HPQ', 'IBM', 'MSFT', 'MSI', 'NOK', 'NVDA', 'ORCL', 'SNAP', 'SPOT', 'TRIP'];
let _timeout = undefined;

const withAtivos = (Component) => {
    class WithAtivos extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                ativos: {},
            };
        }

        componentDidMount() {
            this.getLogos();
            this.updateAtivos();
            _timeout = setInterval(this.updateAtivos, 1000);
        }
        
        componentWillUnmount() {
            clearTimeout(_timeout);
        }

        updateAtivos = () => {
            const prevAtivos = Object.assign(this.state.ativos);
            symbols.forEach(symbol => {
                iex.stockQuote(symbol)
                    .then(quote => {
                        prevAtivos[symbol] = {...this.state.ativos[symbol], quote: quote};
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });

            this.setState({
                ativos: prevAtivos,
            });
        }

        getLogos = () => {
            const prevAtivos = this.state.ativos;
            symbols.forEach(symbol => {
                iex.stockLogo(symbol)
                    .then(logo => {
                        prevAtivos[symbol] = {...this.state.ativos[symbol], logo: logo.url};
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });

            this.setState({
                ativos: prevAtivos
            })
        }
        

        render() {
            return (
                <AtivosContext.Provider value={this.state.ativos}>
                    <Component {...this.props} />
                </AtivosContext.Provider>
            );
        }
    }

    return WithAtivos;
}

export default withAtivos;