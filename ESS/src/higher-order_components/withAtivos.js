import React from 'react';
import { inject } from 'mobx-react';

import { iex } from '../IEXClient';


let symbols = ['AMZN', 'AAPL', 'FB', 'GOOG', 'TSLA', 'DBX', 'EA', 'HPQ', 'IBM', 'MSFT', 'MSI', 'NOK', 'NVDA', 'ORCL', 'SNAP', 'SPOT', 'TRIP'];
let _timeout = undefined;

const withAtivos = (Component) => {
    class WithAtivos extends React.Component {

        // constructor(props) {
        //     super(props);
        //     this.state = {
        //         ativos: {},
        //     };
        // }

        componentDidMount() {
            this.getLogos();
            this.updateAtivos();
            _timeout = setInterval(this.updateAtivos, 1000);
        }

        componentWillUnmount() {
            clearTimeout(_timeout);
        }

        updateAtivos = () => {
            // const prevAtivos = Object.assign(this.state.ativos);
            symbols.forEach(symbol => {
                iex.stockQuote(symbol)
                    .then(quote => {
                        // prevAtivos[symbol] = {...this.state.ativos[symbol], quote: quote};
                        this.props.ativosStore.setQuote(quote);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });
        }

        getLogos = () => {
            // const prevAtivos = this.state.ativos;
            symbols.forEach(symbol => {
                iex.stockLogo(symbol)
                    .then(logo => {
                        // prevAtivos[symbol] = {...this.state.ativos[symbol], logo: logo.url};
                        this.props.ativosStore.setLogo(symbol, logo.url);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });
        }


        render() { 
            return (<Component {...this.props} />);
        }
    }

    return inject('ativosStore')(WithAtivos);
}

export default withAtivos;