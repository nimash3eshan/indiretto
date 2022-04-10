var game_over = localStorage.getItem('game_over');
var savedAns = JSON.parse(localStorage.getItem("saved_ans"));
if(savedAns){
  var inputBox = document.getElementsByTagName("input");
  for(var i = 0; i<20; i++){
    inputBox[i].value = savedAns[i];
  }
}


if(game_over) window.location.replace("./evaluate.html"); 

window.onload = function () {
 // document.addEventListener('contextmenu', event => event.preventDefault());
  var totalSecs = localStorage.getItem('totalSecs');
  if(totalSecs){
    console.log("Total secs",totalSecs);
  }else{
    totalSecs = 00;
  }
     

  var timeLimit = 600; //seconds
  var mins = Math.floor(totalSecs/60);
  var seconds = totalSecs - (mins*60); 
  var tens = 00; 
  var disSec = 59 - seconds;
  var disMin = Math.floor((timeLimit-disSec)/60)-mins;
  
  
  var appendTens = document.getElementById("tens");
  var appendSeconds = document.getElementById("seconds");
  var appendMins = document.getElementById("mins");
  
  
  var Interval ;
  console.log("time",mins,seconds,tens); 
  
  setinTime();

  clearInterval(Interval);
  Interval = setInterval(startTimer, 10);

  function alertTime(){
    if(totalSecs>(timeLimit-10)){
      document.getElementsByClassName("wrapper")[0].childNodes[3].style.color = "red";
    }
    if(totalSecs>=timeLimit) submitAns();
  }
  
    

  function startTimer () {
    tens++;
    var disTens = 99-tens;
    
    if(disTens <= 9){
      appendTens.innerHTML = "0" + disTens;
    }
    
    if (disTens > 9){
      appendTens.innerHTML = disTens;
      
    } 
    
    if (tens > 99) {
      console.log("seconds");
      seconds++;
      disSec = 60 - seconds;
      totalSecs++;
      localStorage.setItem("totalSecs", totalSecs);
      appendSeconds.innerHTML = "0" + disSec;
      tens = 0;
      appendTens.innerHTML = "0" + 0;

      if(totalSecs>(timeLimit-10) && totalSecs<timeLimit){
        var beep =new Audio("./src/beep.mp3");
        beep.play();
      }
    }
    
    if (disSec > 9){
      appendSeconds.innerHTML = disSec;
    }
    
    if(seconds > 59){
        console.log("mins");
        mins++;
        disMin = Math.floor(timeLimit/60)-mins;
        if(disMin<10) appendMins.innerHTML = "0" + disMin;
        else if(disMin>9) appendMins.innerHTML = disMin;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
    }
    alertTime();
  }

  function setinTime(){
    appendSeconds.innerHTML = disSec;
    appendMins.innerHTML = disMin;
  }
}





//inputs
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("submitBtn").style.display = "inline";
  } else {
    document.getElementById("submitBtn").style.display = "none";
    document.getElementById("nextBtn").innerHTML = "Next";
    document.getElementById("nextBtn").style.display = "inline";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);

}

function saveAns()
{
  var answers=[]
  var inputBox = document.getElementsByTagName("input");
  for(var i = 0; i<20; i++){
    answers[i]=inputBox[i].value;
  }
  localStorage.setItem("saved_ans", JSON.stringify(answers));
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

// Magnifier

function magnify(imgID, zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);
  /*create magnifier glass:*/
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");
  /*insert magnifier glass:*/
  img.parentElement.insertBefore(glass, img);
  /*set background properties for the magnifier glass:*/
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;
  /*execute a function when someone moves the magnifier glass over the image:*/
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);
  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
  function moveMagnifier(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /*prevent the magnifier glass from being positioned outside the image:*/
    if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
    if (x < w / zoom) {x = w / zoom;}
    if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
    if (y < h / zoom) {y = h / zoom;}
    /*set the position of the magnifier glass:*/
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    /*display what the magnifier glass "sees":*/
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}

var activeMag = false;
function switchMag(){
  var glass;
  if(activeMag) {
    document.getElementsByClassName("button-81")[0].style.backgroundColor = ""
    document.getElementsByClassName("button-81")[0].style.color = ""
    glass = document.getElementsByClassName("img-magnifier-glass");
    glass[0].parentNode.removeChild(glass[0]);
    activeMag = false;
  }
  else {
    document.getElementsByClassName("button-81")[0].style.backgroundColor = "black"
    document.getElementsByClassName("button-81")[0].style.color = "white"
    magnify("mainimage", 2);
    activeMag = true;
  }
}

function submitAns(){
  const answers = [];
  var inputBox = document.getElementsByTagName("input");
  for(var i = 0; i<20; i++){
    answers[i]=inputBox[i].value.toLocaleLowerCase().replace(/\s/g, '');
  }
  console.log(answers);

  localStorage.setItem("my_answers", JSON.stringify(answers)); //store ans
  localStorage.setItem("game_over",true);

  window.location.replace("./evaluate.html");
}