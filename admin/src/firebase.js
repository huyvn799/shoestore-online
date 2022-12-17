// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjfDU-krsUdRSvGmxLlvZh2wsn3D1haEA",
  authDomain: "sportyshoes-48ed4.firebaseapp.com",
  projectId: "sportyshoes-48ed4",
  storageBucket: "sportyshoes-48ed4.appspot.com",
  messagingSenderId: "829565137569",
  appId: "1:829565137569:web:0e5408cb262ea91b0776e0",
  measurementId: "G-SXKCHB5XM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;