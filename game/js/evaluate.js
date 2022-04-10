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