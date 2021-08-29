import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAJ6j74jvwGDCRDJcK2zC59bcu-6P_ACcQ",
  authDomain: "cafekora-4cd60.firebaseapp.com",
  projectId: "cafekora-4cd60",
  storageBucket: "cafekora-4cd60.appspot.com",
  messagingSenderId: "887241508282",
  appId: "1:887241508282:web:8dbd762544cdc95c054983",
  measurementId: "G-W6FYZJS3WB"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

const storage = firebase.storage();
const ts = firebase.firestore.Timestamp.now()
const time = firebase.firestore.FieldValue.serverTimestamp()
export { db, auth, storage , ts, time };