import { observable, action } from 'mobx';
import axios from 'axios';


class HistoryStore {

    @observable movs = new Map();


    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action putMov = (mov) => {
        this.movs.set(mov.id, mov);
    }

    @action updateMovs = (token) => {
        axios
            .get('http://localhost:9000/api/movimentos/getMovs', {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(response => this.setMovs(response.data))
            .catch(error => console.error(error));
    }

    @action setMovs = movs => {
        movs.forEach(mov => {
            this.movs.set(mov.id, mov);
        });
    }
}

export default HistoryStore;