import React from 'react';
import { inject } from 'mobx-react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

import { iex } from '../IEXClient';

let symbols = ['AMZN', 'AAPL', 'FB', 'GOOG', 'TSLA', 'EA', 'HPQ', 'IBM', 'MSFT', 'MSI', 'NOK', 'NVDA', 'ORCL', 'SNAP', 'TRIP'];


const withAtivos = (Component) => {
    class WithAtivos extends React.Component {

        componentDidMount() {
            axios
                .get('http://essbackend.blurryface.pt/quotes-ms/quotes')
                .then(response => this.props.ativosStore.setQuotes(Object.values(response.data)))
                .catch(error => console.error(error));


            const socket = socketIOClient("http://essbackend.blurryface.pt/");
            socket.on('quote', quote => {
                this.props.ativosStore.setQuote(quote);
            });
            this.getLogos();
            this.props.ativosStore.setDataLoad(true);
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
                    series: [[]]
                }

                value.forEach(object => {
                    if (object.close) {
                        data.series[0].push(object.close);
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