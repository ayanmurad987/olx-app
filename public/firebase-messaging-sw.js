importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase.js');
var config = {
    apiKey: "AIzaSyDFJLKgNTwbXsrZPaquuvikqZyCHKU518A",
    authDomain: "olx-ayan-pk.firebaseapp.com",
    databaseURL: "https://olx-ayan-pk.firebaseio.com",
    projectId: "olx-ayan-pk",
    storageBucket: "olx-ayan-pk.appspot.com",
    messagingSenderId: "152708313324"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();