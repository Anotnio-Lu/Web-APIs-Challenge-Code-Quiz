var goBackBtn = document.getElementById("go-back");
var clearBtn = document.getElementById("clear-highscore");
var scoreContainer = document.getElementsByClassName("score-list-container");
var scoreList = document.querySelector("#score-list");

var storelist = []

goBackBtn.addEventListener("click", function (event){
    event.preventDefault();

    window.location.href = "index.html";
})

clearBtn.addEventListener("click", function (event){
    event.preventDefault();
    localStorage.removeItem('Collection of results')
    scoreList.innerHTML = "";
})

function printResults(){

    var Fulllist = JSON.parse(localStorage.getItem("Collection of results"));
    if (Fulllist !== null) {
        storelist = Fulllist;
    }

    for (var i = 0; i < storelist.length; i++) {
        var results = storelist[i];
        var name = results.name
        var score = results.score
        var li = document.createElement("li");
        li.textContent = name + ", " + score
        scoreList.appendChild(li);

    }
}

printResults()