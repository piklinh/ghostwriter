import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD28M6a8QMoniBupxuBqRR9uHm-GViANwE",
    authDomain: "ghost-writer-7d08c.firebaseapp.com",
    databaseURL: "https://ghost-writer-7d08c.firebaseio.com",
    projectId: "ghost-writer-7d08c",
    storageBucket: "ghost-writer-7d08c.appspot.com",
    messagingSenderId: "767658760377",
    appId: "1:767658760377:web:d877b741931fdce6ffa368"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;