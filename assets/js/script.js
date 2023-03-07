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
var questionCountDisplay = document.querySelector(".question-count");

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

function questionFive(){
    questionNumber()
    var questionTwoarray = ['Java', 'Basic', 'Visual Basic', 'Ada']
    questionLoader(questionTwoarray, "Microsoft's object-oriented primary programming languages includes:")

    answer.addEventListener("click", function(event){

        correctAnswerOnly(event, 3);
        submitActions()
        return
    })    
    return
}

function questionFour(){
    questionNumber()
    var questionTwoarray = ["Apple's IOS", "Google's Andriod", "Mas OS X", "Black berry OS"]
    questionLoader(questionTwoarray, "Today's fastest growing mobile phone operating system is:")

    answer.addEventListener("click", function(event){

        if(questionCount >= 4){
            return
        }
        correctAnswerOnly(event, 2);
        return
    })    
    return
}

function questionThree(){
    questionNumber()
    var questionTwoarray = ['1975', '1980', '1987', '1995']
    questionLoader(questionTwoarray, "Java Script was first released in:")

    answer.addEventListener("click", function(event){

        if(questionCount >= 3){
            return
        }
        correctAnswerOnly(event, 4);
        return
    })    
    return
}

function questionTwo(){ 
    questionNumber()
    var questionTwoarray = ['2002', '2004', '2005', '2007']
    questionLoader(questionTwoarray, "Android operating system was acquired by Google in:")

    answer.addEventListener("click", function(event){

        if(questionCount >= 2){
            return
        }
        correctAnswerOnly(event, 3);
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
    } else if(questionCount == 3){
        questionFour()
    } else if(questionCount == 4){
        questionFive()
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

function questionNumber(){
    questionCountDisplay.textContent = questionCount + 1
}

function start(){
    introContainer.setAttribute("style", "display: none;")
    questionCard.setAttribute("style", "display: block;")
    timeEl.textContent = secondsLeft
    setTime()
    questionOne()
}

startB.addEventListener("click", start)