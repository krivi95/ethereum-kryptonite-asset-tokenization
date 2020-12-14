import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyD__iR2Az3NDW7-a4Cpr6YgM7695XSIg94",
  authDomain: "kryptonite-token.firebaseapp.com",
  projectId: "kryptonite-token",
  storageBucket: "kryptonite-token.appspot.com",
  messagingSenderId: "876140174765",
  appId: "1:876140174765:web:3d77b7bf5372578dd05524"
};

const app = firebase.initializeApp(firebaseConfig);

export default app;
