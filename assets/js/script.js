var startB = document.querySelector(".start-button");
var introContainer = document.querySelector(".intro-containter");
var questionCard = document.querySelector(".question-container");
var questionHeader = document.querySelector(".questions");
var timeEl = document.querySelector(".time");
var answer = document.getElementById("answer-container");
var alertMessage = document.querySelector(".alert");
var buttonTags = document.querySelectorAll(".next");

var questionCount = 0

var secondsLeft = 75;


function setTime() {
    var timerInterval = setInterval(function() {

        secondsLeft--;
        
        timeEl.textContent = secondsLeft ;

        if(secondsLeft === 0) {
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
        console.log(correctAnswer + ' correct')
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