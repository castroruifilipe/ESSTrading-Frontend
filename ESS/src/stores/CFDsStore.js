import { observable, action } from 'mobx';

import { db, auth } from '../firebase';

class CFDsStore {
    @observable CFDs = new Map();

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action setCFDs = CFDs => {
        for (let key in CFDs) {
            let cfd = CFDs[key];
            this.CFDs.set(key, cfd);
        }
    }

    @action updateCFDs = () => {
        db.onGetCFDs(auth.currentUser().uid, snapshot => this.setCFDs(snapshot.val()));
    }

}

export default CFDsStore;