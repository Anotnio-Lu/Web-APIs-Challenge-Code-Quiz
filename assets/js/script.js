var startB = document.querySelector(".start-button");
var introContainer = document.querySelector(".intro-containter");
var questionCard = document.querySelector(".question-container");
var timeEl = document.querySelector(".time");
var answer = document.getElementById("answer-container");
var alertMessage = document.querySelector(".alert");


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


function questionOne(){
    answer.addEventListener("click", function(event){
        correctAnswerOnly(event, "answer-one");
        return
    })
    return
}


function correctAnswerOnly(select, input){
    var element = select.target;
    var correctAnswer = element.getAttribute("id");

    if(correctAnswer == input){
        alertMessage.textContent = "Correct!"
        setTimeToClearText()
        timeEl.textContent = secondsLeft
    } else {
        alertMessage.textContent = "Incorrect!"
        setTimeToClearText()
        secondsLeft -= 15;
        timeEl.textContent = secondsLeft
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