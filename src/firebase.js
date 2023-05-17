import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage";
import {FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGE_SENDER_ID, FIREBASE_PROJECT_ID, FIREBASE_KEY, FIREBASE_APP_ID, FIREBASE_DOMAIN} from "./env-config"

const firebaseConfig = {
    apiKey: FIREBASE_KEY,
    authDomain: FIREBASE_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
    appId: FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
