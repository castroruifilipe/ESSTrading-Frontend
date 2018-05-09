import React from 'react';
import { inject } from 'mobx-react';

import { db } from '../firebase';
import { iex } from '../IEXClient';


let symbols = ['AMZN', 'AAPL', 'FB', 'GOOG', 'TSLA', 'EA', 'HPQ', 'IBM', 'MSFT', 'MSI', 'NOK', 'NVDA', 'ORCL', 'SNAP', 'TRIP'];
let _timeout = undefined;

const withAtivos = (Component) => {
    class WithAtivos extends React.Component {

        componentDidMount() {
            symbols.forEach(symbol => {
                db.onGetQuote(symbol, (snapshot) => this.props.ativosStore.setQuote(snapshot.val()))
            })
            this.getLogos();
            this.updateAtivos();
            this.props.ativosStore.setDataLoad(true);
            _timeout = setInterval(this.updateAtivos, 3000);
        }

        componentWillUnmount() {
            clearTimeout(_timeout);
        }

        updateAtivos = () => {
            symbols.forEach(symbol => {
                iex.stockQuote(symbol)
                    .then(quote => {
                        if (quote.iexAskPrice * quote.iexBidPrice !== 0) {
                            db.doUpdateQuote(quote);
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });
        }

        getLogos = () => {
            symbols.forEach(symbol => {
                iex.stockLogo(symbol)
                    .then(logo => {
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


const getChartData = (symbol, variacao) => {
    return new Promise(function (resolve, reject) {
        iex.stockChart(symbol, variacao)
            .then((value) => {
                let data = {
                    labels: [],
                    datasets: [
                        {
                            label: "My Second dataset",
                            fillColor: "rgba(0,0,0,0)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(151,187,205,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(151,187,205,1)",
                            data: []
                        }
                    ]
                };

                value.forEach(object => {
                    if (object.close) {
                        data.labels.push("")
                        data.datasets[0].data.push(object.close)
                    }
                });
                resolve(data);
            })
            .catch(error => reject(error));
    });
}

const getChartDatas = (variacao) => {
    return new Promise(function (resolve, reject) {
        let chartDatas = {};
        symbols.forEach(symbol => {
            getChartData(symbol, variacao)
                .then(chartData => {
                    chartDatas[symbol] = chartData;
                    if (Object.keys(chartDatas).length === symbols.length) {
                        resolve(chartDatas);
                    }
                })
                .catch(error => reject(error));
        });
    })
}

export {
    withAtivos,
    getChartData,
    getChartDatas,
}