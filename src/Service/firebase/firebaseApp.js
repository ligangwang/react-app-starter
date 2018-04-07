import firebase from 'firebase';
import "firebase/firestore";

const firebaseConfig = require('./firebase-config.json');
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
