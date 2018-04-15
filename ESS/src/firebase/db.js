import { db } from './firebase';

// User API
export const doCreateUser = (id, username, first_name, last_name, contacto) =>
    db.ref(`users/${id}`).set({
        username,
        first_name,
        last_name,
        contacto,
    });

export const onceGetUser = (id) =>
    db.ref(`users/${id}`).once('value');