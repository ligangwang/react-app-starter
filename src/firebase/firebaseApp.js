import firebase from 'firebase';
import "firebase/firestore";

const firebaseConfig = require('./firebase-config.json');
const firebaseApp = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

export default firebaseApp;
