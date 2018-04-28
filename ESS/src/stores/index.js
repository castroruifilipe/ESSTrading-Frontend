import { configure } from 'mobx';

import SessionStore from './sessionStore';
import AtivosStore from './ativosStore';
import CFDsStore from './CFDsStore';
import HistoryStore from './historyStore';

configure({ enforceActions: true});

class RootStore {
    constructor() {
        this.sessionStore = new SessionStore(this);
        this.ativosStore = new AtivosStore(this);
        this.cfdsStore = new CFDsStore(this);
        this.historyStore = new HistoryStore(this);
    }
}

const rootStore = new RootStore();

export default rootStore;