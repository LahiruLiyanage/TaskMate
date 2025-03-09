import {auth} from './firebase.config.js';
import $ from 'jquery';
import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {initializeApp} from "./app.js";

const provider = new GoogleAuthProvider();
export const securityContext = {loggedUser: null};

