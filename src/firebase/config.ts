import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB_4B_zRUI2DFdpRusCnLnds8zucONw8dg",
  authDomain: "start-test-with-firebase.firebaseapp.com",
  projectId: "start-test-with-firebase",
  storageBucket: "start-test-with-firebase.appspot.com",
  messagingSenderId: "964208449690",
  appId: "1:964208449690:web:ea75fbed13d99b97f02723"
};


// init firebase
initializeApp(firebaseConfig);

// init firestore
const db = getFirestore();

export { db }