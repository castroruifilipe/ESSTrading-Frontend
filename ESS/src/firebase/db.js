import { db } from './firebase';
import userImage from '../constants/userImage';

// User API
export const doCreateUser = (id, username, first_name, last_name, contacto) =>
    db.ref(`users/${id}`).set({
        username,
        first_name,
        last_name,
        contacto,
        image: userImage,
    });

export const onceGetUser = id =>
    db.ref(`users/${id}`).once('value');

export const onGetUser = (id, func) =>
    db.ref(`users/${id}`).on('value', func);

export const doUpdateUser = function (id, username, first_name, last_name, contacto, image, data_nascimento, sexo, nif) {
    return new Promise((resolve, reject) => {
        db.ref(`users/${id}`).set({
            username,
            first_name,
            last_name,
            contacto,
            image: (image || userImage),
            saldo: 10000,
            data_nascimento,
            sexo,
            nif
        })
            .then(() => resolve())
            .catch(error => reject());
    })
}