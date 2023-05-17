import {initializeApp} from "firebase/app";
import {getAuth, connectAuthEmulator} from "firebase/auth"
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAXGIS3BQKSzNfxOqhHPLKo0XAtIzmXKfU",
    authDomain: "online-photo-album-project.firebaseapp.com",
    projectId: "online-photo-album-project",
    storageBucket: "online-photo-album-project.appspot.com",
    messagingSenderId: "329673590806",
    appId: "1:329673590806:web:b0f7ef75b8f5eba627cd37"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
