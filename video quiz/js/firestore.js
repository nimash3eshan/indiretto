 console.log("firestore loaded");
 
 
 //krish
 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

 // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {
    getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const db = getFirestore();

var teamName = localStorage.getItem('group');

//krish

//krish

async function sendData(){
    var marks = localStorage.getItem("totalMarksRiddle");
    var ref = collection(db,"riddle");

    const docRef = await addDoc(
        ref, {
            TeamName: teamName,
            Marks:marks
        }
    )
    .then(()=>{
        levelCompleted()
        alert("data added successfully");
    })
    .catch((error)=>{
        alert("unsuccessfull, error:" + error);
    })
}

let quit = document.querySelector("#quit");


//what happen when 'Quit' Button Will Click
quit.addEventListener("click", () => {
    sendData();
    
});