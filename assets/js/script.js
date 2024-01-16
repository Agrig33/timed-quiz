// to keep track of quiz progress
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

//DOM elements
var timerEl = document.getElementById ("time");
var startBtn = document.getElementById ("start");
var submitBtn = document.getElementsById ("submit");
var questionsEl = document.getElementById ("questions");
var choicesEl = document.getElementsById ("choices");


