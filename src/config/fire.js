import firebase from 'firebase/app'
import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';
import 'firebase/analytics';

// if these stop working change firebase/app to firebase. Delete the imports below

const firebaseConfig = {
    apiKey: "AIzaSyBuzXQMsLsWBUN9kavrzZBRWz5bIuI62Vk",
    authDomain: "knitting-319c2.firebaseapp.com",
    databaseURL: "https://knitting-319c2.firebaseio.com",
    projectId: "knitting-319c2",
    storageBucket: "knitting-319c2.appspot.com",
    messagingSenderId: "1045809762217",
    appId: "1:1045809762217:web:cebcc7dcba27a45e4fbeb8",
    measurementId: "G-D8M3EHC92V"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export default fire;