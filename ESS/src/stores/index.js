import { configure } from 'mobx';

import SessionStore from './sessionStore';
import AtivosStore from './ativosStore';

configure({ enforceActions: true});

class RootStore {
    constructor() {
        this.sessionStore = new SessionStore(this);
        this.ativosStore = new AtivosStore(this);
    }
}

const rootStore = new RootStore();

export default rootStore;