// global variable 
const levelArr = document.getElementsByName("level");
let level, answer, score;
const scoreArr = [];

// Add event listener
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);

date.innerHTML = time();

function time(){
    let d = new Date();
    return d;
}

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

    answer = Math.floor(Math.random()*level)+1;
    msg.innerHTML = "Guess a #1-" + level;
    guess.placeholder = answer;
}

function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess)  || userGuess == ""){
        msg.innerHTML = "Invalid. Guess a #1-" + level;
        return;
    }
    score++;
    if(userGuess < answser)
        msg.innerHTML = "Too low, guess a #1-" + level;
    else if(userGuess > answer)
        msg.innerHTML = "Too high, guess a #1-" + level;
    else{
        msg.innerHTML = "Correct! You win, it took " + score + " tries.";
    }

}