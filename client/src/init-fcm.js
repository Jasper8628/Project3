import * as firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCaZavTBWx55HG-hFNY6Nfz9wcM_IMQkIo",
    authDomain: "project3-6c48c.firebaseapp.com",
    databaseURL: "https://project3-6c48c.firebaseio.com",
    projectId: "project3-6c48c",
    storageBucket: "project3-6c48c.appspot.com",
    messagingSenderId: "945894585584",
    appId: "1:945894585584:web:f3d495b98ead98d65cbe35",
    measurementId: "G-HR2CPH7XBB"
});
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey("BJYuNQp-tq-OuIna_RY1xY_xvXbtT6ur9ZJ2EzasEqSNFGYBPb4Eic8-rmVcAK6wJBUA6lMGa_AQJBLDtQSgpNA");
export { messaging };