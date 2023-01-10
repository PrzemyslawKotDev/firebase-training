import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyAIImtjAzaOqLyjk6SrDdGunIslV4Bf0II",
    authDomain: "training-ttms.firebaseapp.com",
    projectId: "training-ttms",
    storageBucket: "training-ttms.appspot.com",
    messagingSenderId: "410989675705",
    appId: "1:410989675705:web:0dbc96450b56a0be14c768"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'todos')