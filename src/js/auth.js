import {auth} from './firebase.config.js';
import $ from 'jquery';
import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {initializeApp} from "./app.js";

const provider = new GoogleAuthProvider();
export const securityContext = {loggedUser: null};

/* A listener to detect user status */
onAuthStateChanged(auth, async (user) => {
    if (user) {     /* Sign in */
        securityContext.loggedUser = user.email;
        $("#login, #splash").addClass("d-none");
        $("#app").removeClass("d-none");
        await initializeApp();
    } else {        /* Sign out */
        securityContext.loggedUser = null;
        setTimeout(() => {
            $("#login").removeClass("d-none");
            $("#app, #splash").addClass("d-none");
        }, 1000);
    }
});

$("#btn-sign-in-google").on('click', async () => {
    await signInWithPopup(auth, provider);
});

$("#btn-sign-out").on('click', async () => {
    await signOut(auth);
});