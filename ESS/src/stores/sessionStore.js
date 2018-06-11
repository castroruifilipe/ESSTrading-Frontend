import { observable, action } from 'mobx';
import axios from 'axios';

class SessionStore {

    @observable token = null;
    @observable user = {};


    @observable authUser = null;
    @observable userDB = {};


    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action setToken = token => {
        this.token = token;
        if (token) {
            sessionStorage.setItem('jwtToken', token)
            this.updateUser();
        } else {
            sessionStorage.removeItem('jwtToken');
            this.setUser({});
        }
    }

    @action setUser = user => {
        this.user = user;
    }

    @action setSaldo = saldo => {
        this.user.saldo = saldo;
    }

    @action updateUser = () => {
        axios
            .get('http://essbackend.blurryface.pt/api/customers/getProfile', {
                headers: { 'Authorization': 'Bearer ' + this.token }
            })
            .then(response => this.setUser(response.data))
            .catch(error => console.error(error));
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
            .then(token => axios.get('http://essbackend.blurryface.pt/api/customers/getProfile', {
                headers: { 'Authorization': token }
            }))
            .then(user => {
                this.setUserDB(user.data)
            })
            .catch(error => console.error(error));
}

export default SessionStore;