import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAea2eh18zsrKWjcKuBCoVq8qGns-x-Xs8",
  authDomain: "indiretto-a2516.firebaseapp.com",
  databaseURL: "https://indiretto-a2516-default-rtdb.firebaseio.com",
  projectId: "indiretto-a2516",
  storageBucket: "indiretto-a2516.appspot.com",
  messagingSenderId: "950979902544",
  appId: "1:950979902544:web:652e58ebeea76ddbda6555",
  measurementId: "G-NPN7DEXW95"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}