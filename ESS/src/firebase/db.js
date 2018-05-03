import { db } from './firebase';
import userImage from '../constants/userImage';
import rootStore from '../stores';

export const doUpdateQuote = (quote) =>
    db.ref(`quotes/${quote.symbol}`).update({
        ...quote
    })

export const onGetQuotes = (func) =>
    db.ref(`quotes`).on('value', func);

export const onGetQuote = (symbol, func) =>
    db.ref(`quotes/${symbol}`).on('value', func);

export const doCreateUser = (id, username, first_name, last_name, contacto) =>
    db.ref(`users/${id}`).set({
        username,
        first_name,
        last_name,
        contacto,
        saldo: 10000,
        image: userImage,
        imageCroped: userImage,
    });

export const onceGetUser = id =>
    db.ref(`users/${id}`).once('value');

export const onGetUser = (id, func) =>
    db.ref(`users/${id}`).on('value', func);

export const doUpdateUser = function (id, username, first_name, last_name, contacto, image, imageCroped, data_nascimento, sexo, nif) {
    return new Promise((resolve, reject) => {
        db.ref(`users/${id}`).update({
            username,
            first_name,
            last_name,
            contacto,
            image: (image || userImage),
            imageCroped: (imageCroped || userImage),
            data_nascimento,
            sexo,
            nif
        })
            .then(() => resolve())
            .catch(error => reject());
    })
}

export const doUpdateSaldo = function (id, saldo) {
    return new Promise((resolve, reject) => {
        db.ref(`users/${id}`).update({
            saldo,
        })
            .then(() => resolve())
            .catch(error => reject());
    })
}

export const doAbrirCFD = function (id, tipo, ativo, unidades, montante, valorAbertura) {
    onceGetUser(id)
        .then(snapshot => {
            let saldo = snapshot.val().saldo;
            doUpdateSaldo(id, saldo - montante);
        })
        .catch(error => console.error(error));
    return new Promise((resolve, reject) => {
        db.ref(`cfds/${id}`).push({
            ativo,
            tipo,
            unidades,
            montante,
            valorAbertura,
            dataAbertura: new Date().toLocaleString(),
        })
            .then(() => resolve())
            .catch(error => reject());
    });
}

export const onceGetCFDs = id =>
    db.ref(`cfds/${id}`).once('value');

export const onGetCFDs = (id, func) =>
    db.ref(`cfds/${id}`).on('value', func);

export const onGetHistory = (id, func) =>
    db.ref(`movs/${id}`).on('value', func);

export const doNovoMovimento = function (id, cfd, designacao, precoFecho, lucroPerda, percent_lucroPerda) {
    return new Promise((resolve, reject) => {
        db.ref(`movs/${id}`).push({
            designacao,
            valorAbertura: cfd.valorAbertura,
            dataAbertura: cfd.dataAbertura,
            valorInvestido: cfd.montante,
            precoFecho,
            lucroPerda,
            percent_lucroPerda,
            dataFecho: new Date().toLocaleString(),
        })
            .then(() => resolve())
            .catch(error => reject());
    });
}

export const doFecharCFD = function (id, cfd, designacao, precoAtual, lucro_perda, percent_lucro_atual) {
    let cfd_history = rootStore.cfdsStore.CFDs.get(cfd);
    doNovoMovimento(id, cfd_history, designacao, precoAtual, lucro_perda, percent_lucro_atual)
        .then(rootStore.cfdsStore.removeCFD(cfd))
        .catch(error => console.log(error));


    onceGetUser(id)
        .then(snapshot => {
            let saldo = snapshot.val().saldo;
            doUpdateSaldo(id, saldo + cfd_history.montante + lucro_perda);
        })
        .catch(error => console.error(error));

    return new Promise((resolve, reject) => {
        db.ref(`cfds/${id}/${cfd}`).remove()
            .then(() => resolve())
            .catch(error => reject());
    });
}