import { observable, action } from 'mobx';
import axios from 'axios';


class CFDsStore {

    @observable CFDs = new Map();


    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action putCFD = cfd => {
        this.CFDs.set(cfd.id, cfd);
    }

    @action updateCFDs = (token) => {
        axios
            .get('http://essbackend.blurryface.pt/api/cfds/getCFDs', {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(response => this.setCFDs(response.data))
            .catch(error => console.error(error));
    }
    
    @action removeCFD = (cfd) => {
        this.CFDs.delete(cfd);
    }

    @action setCFDs = cfds => {
        cfds.forEach(cfd => {
            this.CFDs.set(cfd.id, cfd);
        });
    }


}

export default CFDsStore;