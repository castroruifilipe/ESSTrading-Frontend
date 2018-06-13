import * as firebase from 'firebase';


var config = {
	apiKey: "AIzaSyDwGpH8LJmxd0jY7OCNM2xKz9_-BKvfx3M",
	authDomain: "ess-trading.firebaseapp.com",
	databaseURL: "https://ess-trading.firebaseio.com",
	projectId: "ess-trading",
	storageBucket: "ess-trading.appspot.com",
	messagingSenderId: "607589122783"
};

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();
const storage = firebase.storage();


export {
	auth,
	db,
	storage,
};