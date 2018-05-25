import { observable, action } from 'mobx';
import axios from 'axios';
import { db, auth } from '../firebase';

class SessionStore {

    @observable authUser = null;
    @observable userDB = {};

    constructor(rootStore) {
        this.rootStore = rootStore;
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