
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCWlZn6Dy-IDXoVzVZe7SPkNMVTjQhPG1w",
    authDomain: "pf5-ej5-escaparate.firebaseapp.com",
    projectId: "pf5-ej5-escaparate",
    storageBucket: "pf5-ej5-escaparate.firebasestorage.app",
    messagingSenderId: "87291712758",
    appId: "1:87291712758:web:c1bd030918825b343d48d7",
    measurementId: "G-RJSP3L3H5H"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);