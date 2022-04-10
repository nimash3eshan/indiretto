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

var teamName = "Team Krish";
var answers = JSON.parse(localStorage.getItem("my_answers")); //get them back
var timeDur = localStorage.getItem("totalSecs");
var answers = [...new Set(answers)];



var mark=0,finalMark = 0;

//.toLocaleLowerCase().replace(/\s/g, '')
var movies = [
"Titanic","Jumanji","Matrix","Harry potter","Moana","Ice age","The Batman","IT","Pirates of the Caribbean","The Mandalorian","Saw","The wizard of Oz","Charlie and the chocolate factory" , "Shang-Chi and the Legend of ten rings","John Wick","Game of thrones","Moon Knight" ,"Loki","Inception" ,"butterfly effect"];

var correctAnswers = ['titanic', 'jumanji', 'matrix', 'harrypotter', 'moana', 'iceage', 'thebatman', 'it', 'piratesofthecaribbean', 'themandalorian', 'saw', 'thewizardofoz', 'charlieandthechocolatefactory', 'shang-chiandthelegendoftenrings', 'johnwick', 'gameofthrones', 'moonknight', 'loki', 'inception', 'butterflyeffect'];


for(let i = 0; i<correctAnswers.length; i++){
    if(correctAnswers.includes(answers[i])){
        
        mark++;
    }
   
}

finalMark = (1/timeDur * mark*10)+mark;
//for 10 mins, range 0 - 1.0083 - 1 - 120
document.getElementsByTagName("div")[0].innerHTML = "Answers(no space, lowercase):"+answers+"<br>time:"+timeDur+"<br>Marks:"+finalMark;
console.log(mark);
sendData();
async function sendData(){
    var ref = collection(db,"game-2");

    const docRef = await addDoc(
        ref, {
            TeamName: teamName,
            Marks:finalMark
        }
    )
    .then(()=>{
        alert("data added successfully");
    })
    .catch((error)=>{
        alert("unsuccessfull, error:"+error);
    })
}