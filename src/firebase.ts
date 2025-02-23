// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBwdo7_m-fkX7R_e9HDhqVBQ0IxDQkk0Ew",
    authDomain: "front-cloud-project.firebaseapp.com",
    projectId: "front-cloud-project",
    storageBucket: "front-cloud-project.firebasestorage.app",
    messagingSenderId: "792311915919",
    appId: "1:792311915919:web:ab3f6acc4e672d38fa57fa",
    measurementId: "G-B43184J5Q5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };