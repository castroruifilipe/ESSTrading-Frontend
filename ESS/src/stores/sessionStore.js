import { observable, action } from 'mobx';
import axios from 'axios';

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
        this.authUser.getIdToken()
            .then(token => axios.get('http://localhost:9000/api/customers/getProfile', {
                headers: { 'Authorization': token }
            }))
            .then(user => {
                this.setUserDB(user.data)
            })
            .catch(error => console.error(error));

}

export default SessionStore;