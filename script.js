//Using the variable - questions to include my question, my choices and my answer.
var questions = [{
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["js", "scripting", "javascript", "script"],
    answer: "script"
},
{
    title: "How do you declare a variable?",
    choices: ["=", "+", "x", "-"],
    answer: "="
},
{
    title: " Which symbol or verbiage is used for comments in JavaScript",
    choices: ["comment", "//", "?!", "@"],
    answer: "//"
},
{
    title: "What is one type of a pop-up box available in JavaScript",
    choices: ["pop-up", "alert", "window", "none of these"],
    answer: "alert"
},
{
    title: "Which one is not a JavaScript Date Type",
    choices: ["number", "boolean", " float", "undefine"],
    answer: "float"
}
]

//Timer and Score - using variables to define the scores and to define the time
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;


//This function is to begin the quiz with the start button and the process as I answer the questions
function start() {

    //...continuing this function by starting the timer at 75 seconds
timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

    //...and as I answer the questions the timer continues
timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    
    //If I don't complete the quiz by the time the timer gets to 0 this function will take me to the "your game is over"
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

//If you end the quiz by answering all five questions the timer will stop to end the game
function endGame() {
clearInterval(timer);

//Setting up the variables for once the quiz is over
var quizContent = `
<h1>Your Quiz Is Over! <br>
Did You Do As Well As You Expected!</h1>
<h3>You got a ` + score +  ` /50 points correct!</h3>
<h3>You are receiving ` + score / 1 +  ` points for so many correct answers!!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//You are at the button where it says set score with a placeholder for you name...type in you name and you will get a statement
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}

//This is the section where your quiz is over.
function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `The Highest Score Number So Far!</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//This function will clear the score name and number of points in the local storage and will restart the quiz
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//This function resets the Quiz
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1>
    The JavaScript Quiz!
</h1>
<h3>
    Click the start button to begin playing!   
</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
timeLeft -= 15; 
next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
score += 10;
next();
}

//loops through the questions 
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
 } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
 }
    quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}