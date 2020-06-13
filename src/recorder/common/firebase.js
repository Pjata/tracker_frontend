
import firebase from "firebase";
require('firebase/firestore')



const mapField = field => {
  if(typeof field === 'object' && field !== null){
    const keys = Object.keys(field)
    if(keys.length === 1 && keys[0] === '$oid'){
      return field.$oid
    }
    if(keys.length === 1 && keys[0] === '$date'){
      return new Date(field.$date)
    }
    return keys.reduce((acc,curr) => {
      acc[curr] = mapField(field[curr])
      return acc
    },{})

  }
  return field
}

const firebaseConfig = {
  apiKey: "AIzaSyDTMCW53ZQm8W0ACsjOJ9poYQ17uIFmaF4",
  authDomain: "trackerv2-438d0.firebaseapp.com",
  databaseURL: "https://trackerv2-438d0.firebaseio.com",
  projectId: "trackerv2-438d0",
  storageBucket: "trackerv2-438d0.appspot.com",
  messagingSenderId: "538971969348",
  appId: "1:538971969348:web:61cb16ae440686b009a911",
  measurementId: "G-7T2TFT3X5R",
};
const initFirebase = () => {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  firebase.firestore().settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
  });
  firebase.firestore().enablePersistence();
};
initFirebase();

export default firebase;