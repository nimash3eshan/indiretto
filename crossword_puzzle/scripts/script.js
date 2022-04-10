/*--------Things to do --------------*/


/* setup method to get team name*/
/* add url to next button*/
/* migrate the solution to new fb project*/
/* rename the solution variable using the correct doc name in fb*/

// Firebase configuration
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
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

// variable for the team name
let teamName = "";

// variable to contain the correct answers
let validAns = [];

// variable for the solution document
let solution = "solution";


//  variables timer functions
let startTime;
let duration;
let elapsedTime = 0;
let timerInterval;


//get the team name
getTeamName();
// disable inputs before clicking start
disableInput();
//add square class to all input fields
addSquare();
// callback of the function to load the save data from db
loadSave();

// adding square class to all boxes
function addSquare() {
    for (const box of document.querySelectorAll('.white-square')) {
        box.classList.add('square');
    }
    for (const box of document.querySelectorAll('.black-square')) {
        box.classList.add('square');
    }
}

// get the team name and save in a variable
function getTeamName() {
    teamName = window.localStorage.getItem('group');
}

// function to add on click to submit/sav buttons
function addOnclickToBut() {
// submit button click listener
    document.getElementById("submit-btn").onclick = function () {
        $.confirm({
            title: 'Confirm Submission!',
            content: 'Are you sure you want to submit?\nThis action cannot be undone. Click ok to submit.',
            type: 'red',
            theme: 'supervan',
            buttons: {
                confirm:
                    {
                        btnClass: 'btn-red',
                        action: function () {
                            console.log("ok")
                            disableInput();
                            pauseTimer();
                            showEle(document.getElementById("submit-loader"));
                            checkSubStatSub(db.collection("crossword_puzzle").doc(teamName));
                        }

                    },
                cancel: {
                    action: function () {
                        console.log("cancelled")
                    }
                }

            }
        });
    };

// save button click listener
    document.getElementById("save-btn").onclick = function () {
        showEle(document.getElementById("save-loader"));
        checkSubStatSav(db.collection("crossword_puzzle").doc(teamName));
    };
}

// function to submit the solution
function submit(cond) {
    // send a copy to db
    let sol = convert1D(answer());
    if (!cond) {
        db.collection("crossword_puzzle").doc(teamName).update({
            duration: timeToString(elapsedTime),
            endTime: Date.now(),
            solution: sol,
            submitted: true
        })
            .then((docRef) => {
                hideEle(document.getElementById("submit-loader"));
                if (document.getElementById("submit-btn"))
                    hideEle(document.getElementById("submit-btn"));
                if (document.getElementById("save-btn"))
                    hideEle(document.getElementById("save-btn"));
                $.dialog({
                    title: 'Submission Successful!',
                    content: 'Your submission has been recorded',
                });
                console.log("Document successfully written!");
            })
            .catch((error) => {
                hideEle(document.getElementById("submit-loader"));
                console.error("Error adding document: ", error);
            });

        // get from db
        let docRef = db.collection("crossword_puzzle").doc(solution);
        let impt = []
        docRef.get().then((doc) => {
            if (doc.exists) {
                impt = doc.data().solution;

                // function call to check the correct answers
                checkSolution(convert2D(impt), answer(), impt);

                //display the number of correct answers
                duration = timeToString(elapsedTime)
                dispCorr(validAns);
                showNextBtn();

            } else {
                console.log("No such document!");
                // alert("An error occurred. Please try again. Er: Missing Document");
                $.alert({
                    title: 'Alert!',
                    content: 'An error occurred. Please try again. Er: Missing Document',
                });

            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            $.alert({
                title: 'Alert!',
                content: 'An error occurred. Please try again.',
            });
        });
    } else {
        hideEle(document.getElementById("submit-loader"));
        $.alert({
            title: 'Alert!',
            content: '"You\'ve already submitted this puzzle. Multiple submissions are not allowed."',
        });
        // alert("You've already submitted this puzzle. Multiple submissions are not allowed.")
    }
}

// function to save a copy on the db
function save(cond) {
    if (!cond) {
        let sol = convert1D(answer());
        db.collection("crossword_puzzle").doc(teamName).update({
            solution: sol,
        })
            .then((docRef) => {
                $.alert({
                    title: 'Saved',
                    content: 'Progress has been saved',
                });
                hideEle(document.getElementById("save-loader"))
                console.log("Document successfully written!");
            })
            .catch((error) => {
                hideEle(document.getElementById("save-loader"))
                console.error("Error adding document: ", error);
            });
        // hideEle(document.getElementById("save-loader"))
    } else {
        hideEle(document.getElementById("save-loader"));
        if (
            !($.alert({
                title: 'Alert!',
                content: '"You\'ve already submitted this puzzle. You cannot save your progress at this moment. \n\nRefresh the page to see your changes."',
            }))) {
            window.location.reload();
        }
    }

}

// get answer as a 2D array
function answer() {
    let squares = document.getElementsByClassName("square");
    let temp = [];
    for (let i = 0; i < squares.length; i++) {
        temp[i] = squares[i].value;
    }
    let arr = convert2D(temp);

    for (let i = 0; i < 17; i++) {
        arr[i] = arr[i].map(element => {
            return element.toLowerCase();
        })
    }
    return arr;
}

// check if correct
function checkSolution(impt, userAns, impt1D) {

    // 1 down
    for (let i = 0; i < 8; i++) {
        if (impt[i][6] == userAns[i][6]) {
            validAns[0] = true;
        } else {
            validAns[0] = false;
            break;
        }
    }
    // 2 across
    for (let i = 2; i < 13; i++) {
        if (impt[1][i] == userAns[1][i]) {
            validAns[1] = true;
        } else {
            validAns[1] = false;
            break;
        }
    }
    // 3 down
    for (let i = 1; i < 9; i++) {
        if (impt[i][10] == userAns[i][10]) {
            validAns[2] = true;
        } else {
            validAns[2] = false;
            break;
        }
    }
    // 4 down
    for (let i = 2; i < 11; i++) {
        if (impt[i][1] == userAns[i][1]) {
            validAns[3] = true;
        } else {
            validAns[3] = false;
            break;
        }
    }
    // 5 down
    for (let i = 2; i < 8; i++) {
        if (impt[i][13] == userAns[i][13]) {
            validAns[4] = true;
        } else {
            validAns[4] = false;
            break;
        }
    }
    // 6 across
    for (let i = 0; i < 8; i++) {
        if (impt[4][i] == userAns[4][i]) {
            validAns[5] = true;
        } else {
            validAns[5] = false;
            break;
        }
    }
    // 7 across
    for (let i = 11; i < 17; i++) {
        if (impt[5][i] == userAns[5][i]) {
            validAns[6] = true;
        } else {
            validAns[6] = false;
            break;
        }
    }
    // 8 down
    for (let i = 6; i < 14; i++) {
        if (impt[i][3] == userAns[i][3]) {
            validAns[7] = true;
        } else {
            validAns[7] = false;
            break;
        }
    }
    // 9 across
    for (let i = 1; i < 7; i++) {
        if (impt[7][i] == userAns[7][i]) {
            validAns[8] = true;
        } else {
            validAns[8] = false;
            break;
        }
    }
    // 10 across
    for (let i = 8; i < 14; i++) {
        if (impt[7][i] == userAns[7][i]) {
            validAns[9] = true;
        } else {
            validAns[9] = false;
            break;
        }
    }
    // 11 down
    for (let i = 9; i < 17; i++) {
        if (impt[i][6] == userAns[i][6]) {
            validAns[10] = true;
        } else {
            validAns[10] = false;
            break;
        }
    }
    // 12 down
    for (let i = 9; i < 17; i++) {
        if (impt[i][12] == userAns[i][12]) {
            validAns[11] = true;
        } else {
            validAns[11] = false;
            break;
        }
    }
    // 13 down
    for (let i = 9; i < 15; i++) {
        if (impt[i][15] == userAns[i][15]) {
            validAns[12] = true;
        } else {
            validAns[12] = false;
            break;
        }
    }
    // 14 down
    for (let i = 10; i < 16; i++) {
        if (impt[i][8] == userAns[i][8]) {
            validAns[13] = true;
        } else {
            validAns[13] = false;
            break;
        }
    }
    // 15 across
    for (let i = 11; i < 16; i++) {
        if (impt[10][i] == userAns[10][i]) {
            validAns[14] = true;
        } else {
            validAns[14] = false;
            break;
        }
    }
    // 16 across
    for (let i = 2; i < 7; i++) {
        if (impt[11][i] == userAns[11][i]) {
            validAns[15] = true;
        } else {
            validAns[15] = false;
            break;
        }
    }
    // 17 across
    for (let i = 8; i < 14; i++) {
        if (impt[12][i] == userAns[12][i]) {
            validAns[16] = true;
        } else {
            validAns[16] = false;
            break;
        }
    }
    // 18 across
    for (let i = 4; i < 13; i++) {
        if (impt[14][i] == userAns[14][i]) {
            validAns[17] = true;
        } else {
            validAns[17] = false;
            break;
        }
    }
    // 19 across
    for (let i = 9; i < 16; i++) {
        if (impt[16][i] == userAns[16][i]) {
            validAns[18] = true;
        } else {
            validAns[18] = false;
            break;
        }
    }
    db.collection("crossword_puzzle").doc(teamName).update({
        validAns: validAns
    })
        .then((docRef) => {
            dispAns(impt1D);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });


}

// load save data
async function loadSave() {
    let docRef = db.collection("crossword_puzzle").doc(teamName);
    let impt = []
    await docRef.get().then((doc) => {
        if (doc.exists) {
            impt = doc.data().solution;

            // function call to check the correct answers
            if (doc.data().submitted != null) {
                disableInput();
                showHints();
                if (document.getElementById("submit-btn"))
                    hideEle(document.getElementById("submit-btn"));
                if (document.getElementById("save-btn"))
                    hideEle(document.getElementById("save-btn"));
                pauseTimer();
                duration = doc.data().duration;
                print(doc.data().duration);
                showNextBtn();
                db.collection("crossword_puzzle").doc(solution).get().then((doc2) => {
                    if (doc2.exists) {
                        dispAns(doc2.data().solution);
                        dispCorr(doc.data().validAns);
                    } else {
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });

            } else {
                startTimer(doc.data().startTime);
                hideEle(document.getElementById("start-btn"));
                enableInput();
                showHints();
                addOnclickToBut();
            }


            if (doc.data().solution != null) {
                populatePuzzle(convert1D(impt));
            }


        } else {
            showEle(document.getElementById("start-btn"));
            document.getElementById("start-btn").onclick = function () {
                startTime = Date.now()

                let docRef = db.collection("crossword_puzzle").doc(teamName);
                docRef.get().then((doc2) => {
                    if (doc2.exists) {
                        startTimer(doc2.data().startTime);
                        showEle(document.getElementById("start-loader"));
                        enableInput();
                        showHints();
                        addOnclickToBut();
                        hideEle(document.getElementById("start-loader"));
                        hideEle(document.getElementById("start-btn"));
                    } else {
                        db.collection("crossword_puzzle").doc(teamName).set({
                            startTime: startTime
                        })
                            .then((docRef) => {
                                startTimer(startTime);
                                showEle(document.getElementById("start-loader"));
                                enableInput();
                                showHints();
                                addOnclickToBut();
                                hideEle(document.getElementById("start-loader"));
                                hideEle(document.getElementById("start-btn"));
                            })
                            .catch((error) => {
                                console.error("Error adding document: ", error);
                            });

                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                    $.alert({
                        title: 'Alert!',
                        content: 'An error occurred. Please try again.',
                    });
                });


            }

        }
    }).catch((error) => {
        console.log("Error getting document:", error);
        $.alert({
            title: 'Alert!',
            content: 'An error occurred. Please refresh the page or contact an admin.',
        });
        // alert("An error occurred. Please refresh the page or contact an admin.");
    });
}

// function to populate hints and buttons
function showHints() {
    // import data.js
    document.getElementById("hints").innerHTML +=
        "<section class=\"section-2\">\n" +
        "        <div class=\"row\">\n" +
        "            <div class=\"col-lg-6 btn-cont\">\n" +
        "                <button id=\"save-btn\" class=\"btn-cust\" role=\"button\">\n" +
        "                    <div id=\"save-loader\" class=\"loader\" style=\"display: none\"></div>\n" +
        "                    Save progress\n" +
        "                </button>\n" +
        "            </div>\n" +
        "            <div class=\"col-lg-6 btn-cont\">\n" +
        "                <button id=\"submit-btn\" class=\"btn-cust\" role=\"button\">\n" +
        "                    <div id=\"submit-loader\" class=\"loader\" style=\"display: none\"></div>\n" +
        "                    Submit\n" +
        "                </button>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "\n" +
        "\n" +
        "    </section>\n" +
        "    <section class=\"section-3 \">\n" +
        "        <div class=\"hints\">\n" +
        "            <h2 class=\"hints-title\">Hints</h2>\n" +
        "            <div class=\"row\">\n" +
        "                <div class=\"col-sm-6 \">\n" +
        "                    <h5>Across</h5><br>\n" +
        "                    <p class=\"hints-p\"><span class=\"hint-num\">2 - </span>"+data[0].hint2+"\n" +
        "                        </p>\n" +
        "                    <p class=\"hints-p\"><span class=\"hint-num\">6 - </span>"+data[0].hint6+"\n" +
        "                        </p>\n" +
        "                    <p class=\"hints-p\"><span class=\"hint-num\">7 - </span>"+data[0].hint7+"\n" +
        "                        </p>\n" +
        "                    <p class=\"hints-p\"><span class=\"hint-num\">9 - </span>"+data[0].hint9+"\n" +
        "                    </p>\n" +
        "                    <p class=\"hints-p\"><span class=\"hint-num\">10 - </span>"+data[0].hint10+"\n" +
        "                        </p>\n" +
        "                    <p class=\"hints-p\"><span class=\"hint-num\">15 - </span>"+data[0].hint15+"</p>\n" +
        "                    <p class=\"hints-p\"><span class=\"hint-num\">16 - </span>"+data[0].hint16+"</p>\n" +
        "                    <p class=\"hints-p\"><span class=\"hint-num\">17 - </span>"+data[0].hint17+"\n" +
        "                       </p>\n" +
        "                    <p class=\"hints-p\"><span class=\"hint-num\">18 - </span>"+data[0].hint18+"\n" +
        "                    </p>\n" +
        "                    <p class=\"hints-p\"><span class=\"hint-num\">19 - </span>"+data[0].hint19+"</p>\n" +
        "                </div>\n" +
        "                <div class=\"col-sm-6 \">\n" +
        "                    <h5>Down</h5>\n" +
        "                    <br>\n" +
        "                    <p class=\"hints-p\"><span class=\"hint-num\">1 - </span>"+data[0].hint1+"</p>\n" +
        "                    <p class=\"hints-p\"><span class=\"hint-num\">3 - </span>"+data[0].hint3+"</p>\n" +
        "                    <p class=\"hints-p\"><span class=\"hint-num\">4 - </span>"+data[0].hint4+"</p>\n" +
        "                    <p class=\"hints-p\"><span class=\"hint-num\">5 - </span>"+data[0].hint5+"\n" +
        "                        </p>\n" +
        "                    <p class=\"hints-p\"><span class=\"hint-num\">8 - </span>"+data[0].hint8+"\n" +
        "                        </p>\n" +
        "                    <p class=\"hints-p\"><span class=\"hint-num\">11 - </span>"+data[0].hint11+"</p>\n" +
        "                    <p class=\"hints-p\"><span class=\"hint-num\">12 - </span>"+data[0].hint12+"\n" +
        "                        </p>\n" +
        "                    <p class=\"hints-p\"><span class=\"hint-num\">13 - </span>"+data[0].hint13+"\n" +
        "                        </p>\n" +
        "                    <p class=\"hints-p\"><span class=\"hint-num\">14 - </span>"+data[0].hint14+"\n" +
        "                        </p>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "\n" +
        "\n" +
        "    </section>";
}

// show next button
function showNextBtn() {
    showEle(document.getElementById("next-btn"));
    document.getElementById("next-btn").onclick = function () {
        window.location.replace("../Level 5.html");
    };
}

// function to populate puzzle from saved data
function populatePuzzle(impt) {
    let i = 0;
    let squares = document.getElementsByClassName("square");
    for (const x of squares) {
        x.value = impt[i];
        i++;
    }
}

// function to check the submitted status for submit process
function checkSubStatSub(docRef) {
    let submitted = false;
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log(doc.data());
            if (doc.data().submitted != null) {
                console.log("here2");
                submitted = true;
                submit(submitted);

            } else {
                console.log("here");
                submitted = false;
                submit(submitted);
            }

        } else {
            console.log("No such document!");
            submitted = false;
            submit(submitted);

        }
    }).catch((error) => {
        console.log("Error getting document:", error);
        $.alert({
            title: 'Alert!',
            content: 'An error occurred. \nPlease refresh the page or contact an admin.',
        });
    });
}

// function to check the submitted status for save process
function checkSubStatSav(docRef) {
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log(doc.data());
            if (doc.data().submitted != null) {
                save(doc.data().submitted);
            } else {
                save(doc.data().submitted);
            }

        } else {
            save(true);

        }
    }).catch((error) => {
        console.log("Error getting document:", error);
        $.alert({
            title: 'Alert!',
            content: 'An error occurred. \nPlease refresh the page or contact an admin.',
        });
    });
}

// create a multidimensional array
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}

// convert 1D array to 2D
function convert2D(arr1D) {
    let arr = createArray(17, 17);
    let k = 0;
    for (let i = 0; i < 17; i++) {
        for (let j = 0; j < 17; j++) {
            arr[i][j] = (arr1D[k] == null) ? "" : arr1D[k];
            k++;
        }
    }
    return arr
}

// convert 2D array to 1D
function convert1D(arr2D) {
    let arr = [].concat(...arr2D);
    return arr
}

// disable inputs to the puzzle
function disableInput() {
    document.querySelectorAll('.white-square').forEach(element => element.disabled = true);
}

// enable inputs to the puzzle
function enableInput() {
    document.querySelectorAll('.white-square').forEach(element => element.disabled = false);
    document.querySelectorAll('.given').forEach(element => element.disabled = true);

}

// hide an element
function hideEle(ele) {
    ele.style.display = "none"
}

// show an element
function showEle(ele) {
    ele.style.display = "block"
}

// Highlight correct and wrong answers
function dispAns(impt) {
    let ans = document.getElementsByClassName("square");
    for (let i = 0; i < ans.length; i++) {
        if (!((ans[i].classList.contains("black-square")) || (ans[i].classList.contains("given")))) {
            ans[i].style.backgroundColor = (ans[i].value.toLowerCase() === impt[i]) ? "#b2fdcc" : "#fdb2b2";
        }
    }

}

// function to display the correct number of answers
function dispCorr(ans) {
    let count = 0;
    for (const x of ans) {
        if (x) count++;
    }
    document.getElementById("correct").innerHTML = count + ' out of 19 correct in ' + duration;
}

/*----functions for stopwatch-----*/

// upload time to db
async function uploadStartTime(startTime) {
    db.collection("crossword_puzzle").doc(teamName).update({
        startTime: startTime
    })
        .then((docRef) => {
            return
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

// Convert time to a format of hours, minutes, seconds, and milliseconds
function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

// Create function to modify innerHTML
function print(txt) {
    document.getElementById("display").innerHTML = txt;
}

// Create "start", "pause" and "reset" functions
function startTimer(startTime) {
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 100);
}

// function to pause the timer
function pauseTimer() {
    clearInterval(timerInterval);
}

