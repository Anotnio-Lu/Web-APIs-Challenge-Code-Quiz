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
var initialForm = document.getElementById("initial-form");
var saveButton = document.getElementById("submit-button");

var litag = document.createElement('li');


var questionCount = 0
var endGame = 1

var secondsLeft = 75;
var listScores = [];


function setTime() {
    var timerInterval = setInterval(function() {

        secondsLeft--;
        
        timeEl.textContent = secondsLeft ;

        if(secondsLeft === 0 || endGame === 0) {
            secondsLeft = secondsLeft + 1
            clearInterval(timerInterval);
            timeEl.textContent = secondsLeft
            return
        }

    }, 1000);
}

function setTimeToClearText() {
    var seconds = 3
    var timerIntervalText = setInterval(function() {

        seconds--;

        if(seconds === 0) {
            alertMessage.textContent = ""
            clearInterval(timerIntervalText);
        }

    }, 1000);
}


function storeValue(){

    saveButton.addEventListener("click", function (event){
        event.preventDefault();
        var initialtext = initial.value.trim()
        if (initialtext === "") {
            return;
          }

          var storedresults = JSON.parse(localStorage.getItem("Collection of results"));

        if(storedresults !== null){
            listScores = storedresults
            let nextInitial = new listObject();
            nextInitial.name = initialtext
            nextInitial.score = secondsLeft
            listScores.push(nextInitial);
            localStorage.setItem('Collection of results', JSON.stringify(listScores))
        } else{
            let mainInitial = new listObject();
            mainInitial.name = initialtext
            mainInitial.score = secondsLeft
            localStorage.setItem('Collection of results', JSON.stringify(listScores))

        }
        window.location.href = "Highscore.html";
    })

}


function listObject(){
    this.name
    this.score
}


function questionThree(){
    var questionTwoarray = ['Apple', 'Mango', 'Banana', 'Avo']
    questionHeader.textContent = "Which do you like best?";
    for (var i = 0; i < questionTwoarray.length; i++) {
        buttonTags[i].textContent = questionTwoarray[i];
    }
    answer.addEventListener("click", function(event){

        correctAnswerOnly(event, "answer-four");
        showResult.textContent = secondsLeft
        questionCard.setAttribute("style", "display: none;")
        resultsCard.setAttribute("style", "display: block;")
        storeValue()
        return
    })    
    return
}


function questionTwo(){
    var questionTwoarray = ['Tomorrow', 'today', 'Yesterday', 'never']
    questionHeader.textContent = "second question?";

    for (var i = 0; i < questionTwoarray.length; i++) {
        buttonTags[i].textContent = questionTwoarray[i];
    }

    answer.addEventListener("click", function(event){

        if(questionCount >= 2){
            return
        }
        correctAnswerOnly(event, "answer-two");
        return
    })    
    return
}

function questionOne(){
    answer.addEventListener("click", function(event){
        if(questionCount >= 1){
            return
        }
        correctAnswerOnly(event, "answer-one");
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
    var correctAnswer = element.getAttribute("id");

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