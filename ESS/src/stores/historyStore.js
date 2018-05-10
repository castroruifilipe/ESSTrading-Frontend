import { observable, action } from 'mobx';

import { db, auth } from '../firebase';

class HistoryStore {
    @observable movs = new Map();

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action setMovs = Movs => {
        for (let key in Movs) {
            let mov = Movs[key];
            this.movs.set(key, mov);
        }
    }

    @action updateMovs = () => {
        db.onGetHistory(auth.currentUser().uid, snapshot => this.setMovs(snapshot.val()));
    }

}

export default HistoryStore;