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

firebase.initializeApp(firebaseConfig);


// const app = initializeApp(firebaseConfig);
const db = firebase.firestore();


// Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }

// added test data to check the db connection
function addTestData() {
    db.collection("users").add({
        first: "Ada",
        last: "Lovelace",
        born: 1815
    })
        .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
        console.error("Error adding document: ", error);
        });
}

