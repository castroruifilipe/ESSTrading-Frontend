import { observable, action } from 'mobx';

class AtivosStore {
    @observable dataLoad = false;
    @observable quotes = new Map();
    @observable logos = new Map();
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action setDataLoad = (value) => {
        this.dataLoad = value;
    }

    @action setQuotes = quotes => {
        for (let quote in quotes) {
            if (this.quotes.has(quote.symbol)) {
                let previousQuote = this.quotes.get(quote.symbol);
                if (previousQuote.iexBidPrice !== quote.iexBidPrice ||
                    previousQuote.iexAskPrice !== quote.iexAskPrice ||
                    previousQuote.change !== quote.change ||
                    previousQuote.changePercent !== quote.changePercent) {
                    this.quotes.set(quote.symbol, quote);
                }
            } else {
                this.quotes.set(quote.symbol, quote);
            }
        }
    }

    @action setLogo = (symbol, logo) => {
        this.logos.set(symbol, logo);
    }

    @action setQuote = quote => {
        if (this.quotes.has(quote.symbol)) {
            let previousQuote = this.quotes.get(quote.symbol);
            if (previousQuote.iexBidPrice !== quote.iexBidPrice ||
                previousQuote.iexAskPrice !== quote.iexAskPrice ||
                previousQuote.change !== quote.change ||
                previousQuote.changePercent !== quote.changePercent) {
                this.quotes.set(quote.symbol, quote);
            }
        } else {
            this.quotes.set(quote.symbol, quote);
        }
    }
}

export default AtivosStore;