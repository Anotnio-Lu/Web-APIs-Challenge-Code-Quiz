var startB = document.querySelector(".start-button");
var introContainer = document.querySelector(".intro-containter");
var questionCard = document.querySelector(".question-container");
var answer = document.getElementById("answer-container");
var alertMessage = document.querySelector(".alert");


function questionOne(){
    answer.addEventListener("click", function(event){

    let element = event.target;
    let correctAnswer = element.getAttribute("id");

    if(correctAnswer == 'answer-one'){
        alertMessage.textContent = "Correct!"
    } else {
        alertMessage.textContent = "Incorrect!"
    }
        return
    })
    return
}



function start(){
    introContainer.setAttribute("style", "display: none;")
    questionCard.setAttribute("style", "display: block;")
    questionOne()
}

startB.addEventListener("click", start)