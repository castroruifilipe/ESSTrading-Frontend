import { observable, action } from 'mobx';

import { db } from '../firebase';

class SessionStore {
    @observable authUser = null;
    @observable userDB = null;
    
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action setAuthUser = authUser => {
        this.authUser = authUser;
        this.updateUserDB();
    }

    @action updateUserDB = () => {
        db.onceGetUser(this.authUser.uid)
            .then(snapshot => this.userDB = snapshot.val());
    }
}

export default SessionStore;