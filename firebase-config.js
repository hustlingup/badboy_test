// Firebase configuration and counter initialization
// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase, ref, runTransaction, onValue } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

// TODO: Replace with your actual Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDXPH5_BZ7b8MTng_mIZVMzmte2LJX3xuE",
    authDomain: "badboytest-25dbb.firebaseapp.com",
    databaseURL: "https://badboytest-25dbb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "badboytest-25dbb",
    storageBucket: "badboytest-25dbb.firebasestorage.app",
    messagingSenderId: "1047586507776",
    appId: "1:1047586507776:web:e8042e1b40f2407d8d1ce5",
    measurementId: "G-VXZMZW72VM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to initialize counter for a specific page
export function initializeCounter(counterPath) {
    const counterRef = ref(database, counterPath);

    // Increment counter on page load
    runTransaction(counterRef, (currentValue) => {
        return (currentValue || 0) + 1;
    }).then(() => {
        console.log('Counter incremented successfully');
    }).catch((error) => {
        console.error('Error incrementing counter:', error);
    });

    // Listen for counter updates and display
    onValue(counterRef, (snapshot) => {
        const count = snapshot.val() || 0;
        const counterElement = document.getElementById('counter-value');
        if (counterElement) {
            counterElement.textContent = count.toLocaleString();
        }
    });
}
