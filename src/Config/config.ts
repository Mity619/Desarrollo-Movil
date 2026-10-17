// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD2VsVVSpxZKas628Bpnj82mDBJDSGNHuo",
    authDomain: "moviles-a4356.firebaseapp.com",
    projectId: "moviles-a4356",
    storageBucket: "moviles-a4356.firebasestorage.app",
    messagingSenderId: "225171366865",
    appId: "1:225171366865:web:c9d9fff130d7823add36f0",
    measurementId: "G-5M6MLGTV9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default ({ app });