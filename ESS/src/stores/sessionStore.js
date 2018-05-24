import { observable, action } from 'mobx';

import { db } from '../firebase';

class SessionStore {
    @observable tokenID = null;

    @observable authUser = null;
    @observable userDB = {};

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action setTokenID = tokenID => {
        this.tokenID = tokenID;
        console.log(this.tokenID);
    }

    @action setAuthUser = authUser => {
        this.authUser = authUser;
        if (authUser) {
            this.updateUserDB();
        }
    }

    @action setUserDB = userDB => {
        this.userDB = userDB;
    }

    @action updateUserDB = () =>
        db.onGetUser(this.authUser.uid, snapshot => this.setUserDB(snapshot.val()));
}

export default SessionStore;