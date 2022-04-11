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

// read test data to check the db connection
function readTestData(group, pass) {

  var count = 0;

  db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.data().groupname == group && doc.data().password == pass) {
          count=count+1;
          window.localStorage.setItem('group', group);
        window.location.href = "Level 1.html";
      }
     
      console.log(`${doc.id} => ${doc.data()}`);
    });
    if(count == 0){
      
      $.alert({
        title: 'Attention!',
        content: 'Invalid Username or Password!',
    });
      //alert("Invalid Username or Password");
      
    }
  });
 
}