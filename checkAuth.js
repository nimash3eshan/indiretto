// const loader = document.getElementById('loader')

const Config = {
    apiKey: "AIzaSyAea2eh18zsrKWjcKuBCoVq8qGns-x-Xs8",
    authDomain: "indiretto-a2516.firebaseapp.com",
    databaseURL: "https://indiretto-a2516-default-rtdb.firebaseio.com",
    projectId: "indiretto-a2516",
    storageBucket: "indiretto-a2516.appspot.com",
    messagingSenderId: "950979902544",
    appId: "1:950979902544:web:652e58ebeea76ddbda6555",
    measurementId: "G-NPN7DEXW95"
};

firebase.apps.length == 0 && firebase.initializeApp(Config);


// const app = initializeApp(firebaseConfig);
const fs = firebase.firestore();

let grpName = localStorage.getItem('group')

function getLevel() {
    // console.log
    // let currentLevel
    fs.collection("users").where('groupname', "==", grpName).get().then((docs) => {
        docs.forEach(doc => {
            // console.log(doc.id)
            if (window.location.pathname != '/Level-' + doc.data().currentlevel + '.html') {
                window.location.href = '/Level-' + doc.data().currentlevel + '.html'
            } else {
                loader.style.display = 'none'
            }
        });
        // console.log(doc.groupname)
    }).catch((err) => {
        console.log(err)
    })
}

function levelOneToTwo() {
    fs.collection("users").where('groupname', "==", grpName).get().then((docs) => {
        docs.forEach(doc => {
            //    console.log(doc.id)
            if(doc.data().currentlevel == 1){
                fs.collection("users").doc(doc.id).update({
                    level2: true,
                    currentlevel: 2
                }).then(() => {
                    window.location.href = './Level-2.html'
                    console.log(doc.data())
                }).catch(err=> {
                    console.log(err)
                })
            }else{
                alert("You havn't completed Level 0" + doc.data().currentlevel)
            }
            
        });
        // console.log(doc.groupname)
    }).catch((err) => {
        console.log(err)
    })
}

function levelTwotoThree() {
    fs.collection("users").where('groupname', "==", grpName).get().then((docs) => {
        docs.forEach(doc => {
            if(doc.data().currentlevel == 2){
                fs.collection("users").doc(doc.id).update({
                    level3: true,
                    currentlevel: 3
                }).then(() => {
                    window.location.href = '../Level-3.html'
                    console.log(doc.data())
                }).catch((err) => {
                    console.log(err)
                })
            }else{
                alert("You havn't completed Level 0" + doc.data().currentlevel)
            }
            
        });
    }).catch((err) => {
        console.log(err)
    })
}

function levelThreeToFour(){
    fs.collection("users").where('groupname', "==", grpName).get().then((docs) => {
        docs.forEach(doc => {
            if(doc.data().currentlevel == 3){
                fs.collection("users").doc(doc.id).update({
                    level4: true,
                    currentlevel: 4
                }).then(() => {
                    window.location.href = './Level-4.html'
                    console.log(doc.data())
                }).catch((err) => {
                    console.log(err)
                })
            }else{
                alert("You havn't completed Level 0" + doc.data().currentlevel)
            }
           
        });
    }).catch((err) => {
        console.log(err)
    })
}

function levelFourToFive(){
    fs.collection("users").where('groupname', "==", grpName).get().then((docs) => {
        docs.forEach(doc => {
            if(doc.data().currentlevel){
                fs.collection("users").doc(doc.id).update({
                    level5: true,
                    currentlevel: 5
                }).then(() => {
                    window.location.href = '../Level-5.html'
                    console.log(doc.data())
                }).catch((err) => {
                    console.log(err)
                })
            }else{
                alert("You havn't completed Level 0" + doc.data().currentlevel)
            }
           
        });
    }).catch((err) => {
        console.log(err)
    })
}