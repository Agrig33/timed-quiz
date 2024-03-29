// to keep track of quiz progress
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

//DOM elements
var questionsEl = document.getElementById ("questions");
var timerEl = document.getElementById ("time");
var choicesEl = document.getElementById ("choices");
var submitBtn = document.getElementById ("submit");
var startBtn = document.getElementById ("start");
var initialsEl = document.getElementById ("initials");
var feedbackEl = document.getElementById ("feedback");

function startQuiz() {
//hide start screen
var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");

//show question section
    questionsEl.removeAttribute("class");

//start timer
    timerId = setInterval(clockTick, 1000);

//show start time
    timerEl.textContent = time;

    getQuestion();
}

function getQuestion() {
 //get current question object from array
var currentQuestion = questions[currentQuestionIndex];

//update title with current question
var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

//clear out old question picks
    choicesEl.innerHTML = "";

//loop over choices
    currentQuestion.choices.forEach(function(choice, i) {
//create new button for each choice
var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);
        choiceNode.textContent = i + 1 + ". " + choice;

//attach click event listener to each choice
    choiceNode.onclick = questionClick;

//display on page
    choicesEl.appendChild(choiceNode);
});
}

function questionClick() {
// check if user entered wrong answer
if (this.value !== questions[currentQuestionIndex].answer) {

//penalize
    time -= 10;
if (time < 0) {
    time = 0;
}

//display new time
    timerEl.textContent = time;

    feedbackEl.textContent = "Wrong. Sorry!";
} else {
    feedbackEl.textContent = "Correct. Good Job!";
}

// flash correct/incorrect feedback on page 
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
}, 800);

//moving onto next question
currentQuestionIndex++;

//check to see if there are any questions left
if (currentQuestionIndex === questions.length) {
    quizEnd();
    } else {
    getQuestion();
    }
}

function quizEnd() {
//stopping timer
    clearInterval(timerId);

//show end screen
var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

//final score
var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

//hide question section
    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
//update the time
    time--;
    timerEl.textContent = time;

//check if there is time left
if (time <= 0) {
    quizEnd();
 }
}

function saveHighscore() {
var initials = initialsEl.value.trim();

//make sure value is not empty
if (initials !== "") {
    var highscores = 
    JSON.parse(window.localStorage.getItem("highscores")) || [];

//format new score object for current user
var newScore = {
    score: time,
    initials: initials
};

//save to local storage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

//redirecting to next page
    window.location.href = "highscores.html";
 }
}

function checkForEnter(event) {

// "13" re[resents the enter key
if (event.key === "Enter") {
    saveHighscore();
 }
}

// submitting initials
submitBtn.onclick = saveHighscore;

// start button is click to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;