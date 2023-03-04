var startB = document.querySelector(".start-button");
var introContainer = document.querySelector(".intro-containter");
var questionCard = document.querySelector(".question-container");
var resultsCard = document.querySelector(".results-container");
var questionHeader = document.querySelector(".questions");
var timeEl = document.querySelector(".time");
var answer = document.getElementById("answer-container");
var alertMessage = document.querySelector(".alert");
var buttonTags = document.querySelectorAll(".next");
var showResult = document.getElementById("end-result");
var initial = document.getElementById("initials");
var saveButton = document.getElementById("submit-button");

var questionCount = 0
var endGame = 1

var secondsLeft = 75;
var listScores = [];


function setTime() {
    var timerInterval = setInterval(function() {
        if(secondsLeft !== 0){
            secondsLeft--;
        }

        timeEl.textContent = secondsLeft ;

        if(secondsLeft == 0) {
            submitActions()
            clearInterval(timerInterval);
            timeEl.textContent = secondsLeft
            return
        } else if(endGame == 0){
            secondsLeft = secondsLeft + 1
            clearInterval(timerInterval);
            timeEl.textContent = secondsLeft
        }

    }, 1000);
}

function setTimeToClearText() {
    var seconds = 1
    var timerIntervalText = setInterval(function() {

        seconds--;

        if(seconds === 0) {
            alertMessage.textContent = ""
            clearInterval(timerIntervalText);
        }

    }, 1000);
}

function submitActions(){
    showResult.textContent = secondsLeft
    questionCard.setAttribute("style", "display: none;")
    resultsCard.setAttribute("style", "display: block;")

    saveButton.addEventListener("click", function (event){
        event.preventDefault();

        var initialtext = initial.value.trim()
        if (initialtext === "") {
            return;
          }
          storeValue(initialtext)
    })
    
    initial.addEventListener('keydown', function (event){
        var key = event.key

        let initialtext = initial.value.trim()
        if (initialtext === "") {
            return;
        }

        if(key == 'Enter'){
            event.preventDefault();
            storeValue(initialtext)
        }
    })
}

function storeValue(input){
    let storedresults = JSON.parse(localStorage.getItem("Collection of results"));

    if(storedresults !== null){
        listScores = storedresults
    } 

    let mainInitial = new listObject();
    mainInitial.name = input
    mainInitial.score = secondsLeft
    listScores.push(mainInitial);

    localStorage.setItem('Collection of results', JSON.stringify(listScores))

    window.location.href = "Highscore.html";
}

function listObject(){
    this.name
    this.score
}


function questionLoader(Array, question){
    questionHeader.textContent = question
    for (var i = 0; i < Array.length; i++) {
        buttonTags[i].textContent = Array[i];
    }
}


function questionThree(){
    var questionTwoarray = ['Apple', 'Mango', 'Banana', 'Avo']
    questionLoader(questionTwoarray, "Which fruit is the sweetest?")

    answer.addEventListener("click", function(event){

        correctAnswerOnly(event, 4);
        submitActions()
        return
    })    
    return
}

function questionTwo(){
    var questionTwoarray = ['Tomorrow', 'today', 'Yesterday', 'never']
    questionLoader(questionTwoarray, "When is a good time to finish your HW")

    answer.addEventListener("click", function(event){

        if(questionCount >= 2){
            return
        }
        correctAnswerOnly(event, 2);
        return
    })    
    return
}

function questionOne(){
    answer.addEventListener("click", function(event){
        if(questionCount >= 1){
            return
        }
        correctAnswerOnly(event, 1);
        return
    })
    return
}

function nextQuestion(){

    if(questionCount == 1){
        questionTwo()
    } else if(questionCount == 2){
        questionThree()
    }
}

function correctAnswerOnly(select, input){
    var element = select.target;
    var correctAnswer = element.getAttribute("data-index");

    if(correctAnswer == input){
        alertMessage.textContent = "Correct!"
        setTimeToClearText()
        questionCount++
        if(questionCount === 3){
            endGame = 0
            timeEl.textContent = secondsLeft
        } else{
            timeEl.textContent = secondsLeft
        }
        nextQuestion()
        
    } else {
        alertMessage.textContent = "Incorrect!"
        setTimeToClearText()
        secondsLeft -= 15;
        if(secondsLeft <= 0){
            secondsLeft = 0
        }
        questionCount++
        if(questionCount === 3){
            endGame = 0
            timeEl.textContent = secondsLeft
        } else{
            timeEl.textContent = secondsLeft
        }
        nextQuestion()    
    }
   return
}

function start(){
    introContainer.setAttribute("style", "display: none;")
    questionCard.setAttribute("style", "display: block;")
    timeEl.textContent = secondsLeft
    setTime()
    questionOne()
}

startB.addEventListener("click", start)