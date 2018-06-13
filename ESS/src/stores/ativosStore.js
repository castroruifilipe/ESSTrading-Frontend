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
        quotes.forEach(quote => {
            this.quotes.set(quote.symbol, quote);
        })
        this.dataLoad = true;
    }

    @action setLogo = (symbol, logo) => {
        this.logos.set(symbol, logo);
    }

    @action setQuote = quote => {
        if (this.quotes.has(quote.symbol)) {
            let previousQuote = this.quotes.get(quote.symbol);
            if (previousQuote.bidPrice !== quote.bidPrice ||
                previousQuote.askPrice !== quote.askPrice ||
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