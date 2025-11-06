// global variable 
const levelArr = document.getElementsByName("level");
let level, answer, score;
const scoreArr = [];
let playerName = "Player";

//timers 1
let roundStart;
let roundTimer;
let roundTime = 0;
let allTimes = [];
let fastestTime = null;

//Elemenent References
const playBtn = document.getElementById("playBtn");
const guessBtn = document.getElementById("guessBtn");
const guess = document.getElementById("guess");
const msg = document.getElementById("msg");
const date = document.getElementById("date");
const wins = document.getElementById("wins")
const avgScore = document.getElementById("avgScore")
const giveUpBtn = document.getElementById("giveUpBtn");
const roundTimeEl = document.getElementById("roundTime");
const fastestTimeEl = document.getElementById("fastestTime");
const avgTimeEl = document.getElementById("avgTime");
const setNameBtn = document.getElementById("setNameBtn");
const userNameInput = document.getElementById("userName");


// Add event listener
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", giveUp);
setNameBtn.addEventListener("click", setName);

//date
//date.innerHTML = time(); in case this doesnt work
updateDate();
setInterval(updateDate, 1000)
function updateDate() {
    const d = new Date();
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const month = monthNames[d.getMonth()];
    const day = d.getDate();
    const suffix = getSuffix(day);
    const time = d.toLocaleTimeString();
     date.innerHTML = `${month} ${day}${suffix}, ${d.getFullYear()} ${time}`;
}
function getSuffix(day) {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

//name (for Set name button) remember to add capitalization for pts
function setName() {
    let input = userNameInput.value.trim();
    if (!input) {
        msg.innerHTML = "Please enter a valid name!";
        return;
    }
    //capitalization v
    playerName = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    msg.innerHTML = `Welcome, ${playerName}! Select A level and click Play.`;
    userNameInput.disabled = true;
    setNameBtn.disabled = true;
}

// from video, if timers function delete v
// function time(){
   // let d = new Date();
   //  return d;

// play
function play(){
    score = 0;
    for(let i = 0; i < levelArr.length; i++){
        if(levelArr[i].checked){
            level = levelArr[i].value;
        }
        levelArr[i].disabled = true;
    }
    playBtn.disabled = true;
    guess.disabled = false;
    guessBtn.disabled = false;
    giveUpBtn.disabled = false;

    answer = Math.floor(Math.random()*level)+1;
    msg.innerHTML = "Guess a #1-" + level;

    //guess.placeholder = answer;
    startTimer();
}

//add hot, cold, warm tips to thuis!!
function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess) || userGuess == ""){
        msg.innerHTML = "Invalid. Guess a #1-" + level;
        return;
    }
    score++;

    if(userGuess < answer)
        msg.innerHTML = `Too low, ${getTempHint(userGuess)}. Guess again.`;
    else if(userGuess > answer)
        msg.innerHTML = `Too high, ${getTempHint(userGuess)}. Guess again.`;
    else{
        const timeTaken = stopTimer();
        msg.innerHTML = `Correct, ${playerName}. It took ${score} tries and ${timeTaken.toFixed(2)}s. ${rateScore(score)}`;
        scoreArr.push(score);
        updateScore();
        allTimes.push(timeTaken);
        updateTimes();
        reset();
    }
}

function giveUp() {
    const timeTaken = stopTimer();
    score = level;
    msg.innerHTML = `${playerName}, you gave up. The answer was ${answer}. The Score was set to ${score}. ${rateScore(score)}`;
    scoreArr.push(score);
    updateScore();
    allTimes.push(timeTaken);
    updateTimes();
    reset();
}

function getTempHint(userGuess) {
    const diff = Math.abs(userGuess - answer);
    if (diff <= level * 0.05) return "Hot";
    if (diff <= level * 0.15) return "Warm";
    return "Cold";
}

function rateScore(s) {
    if (s <= level * 0.25) return "Good!";
    else if (s <= level *0.6) return "Okay.";
    else return "Bad!";
}

function updateScore(){
    wins.innerHTML = "Total wins: " + scoreArr.length;
    let lb = document.getElementsByName("leaderboard")
    scoreArr.sort((a,b) => a-b);
    let sum = 0;

    for(let i=0; i<scoreArr.length; i++){
        if(i < lb.length){
            lb[i].innerHTML = scoreArr [i];
        }
        sum += scoreArr[i];
    }
    let avg = sum/scoreArr.length;
    avgScore.innerHTML = "Average Score: " + avg.toFixed(2);
}

//timers 2
function startTimer() {
    roundStart = Date.now();
    roundTimer = setInterval (() => {
        roundTime = (Date.now() - roundStart) / 1000;
        roundTimeEl.innerHTML = "Round Time: " + roundTime.toFixed(2) + "s";
    }
    , 100);
}

function stopTimer() {
    clearInterval(roundTimer);
    const timeTaken = (Date.now() - roundStart) / 1000;
    roundTimeEl.innerHTML = "Round Time: " + timeTaken.toFixed(2) + "s";
    return timeTaken;
}

function updateTimes() {
    let total = allTimes.reduce((a, b) => a + b, 0);
    let avg = total / allTimes.length;
    let fastest = Math.min(...allTimes);
    fastestTime = fastest;
    fastestTimeEl.innerHTML = "Fastest Game: " + fastest.toFixed(2) + "s";
    avgTimeEl.innerHTML = "Average Time: " + avg.toFixed(2) + "s";
}

function reset(){
    guess.disabled = true;
    guessBtn.disabled = true;
    playBtn.disabled = false;
    for(let i=0; i<levelArr.length;i++)
        levelArr[i].disabled = false;
    guess.value = "";
    guess.placeholder = "";
}