import { initializeApp } from 'firebase/app'
import { useFirestore } from 'vuefire'

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyAIImtjAzaOqLyjk6SrDdGunIslV4Bf0II",
    authDomain: "training-ttms.firebaseapp.com",
    projectId: "training-ttms",
    storageBucket: "training-ttms.appspot.com",
    messagingSenderId: "410989675705",
    appId: "1:410989675705:web:0dbc96450b56a0be14c768"
})

export const db = useFirestore()