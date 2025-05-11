const pomodoroTimer = document.getElementById("pomodoroTimer");
const pomodoroNumber = document.getElementById("pomodoroNumber");

const studyButton = document.getElementById("studyButton");
const breakButton = document.getElementById("breakButton");
const longBreakButton = document.getElementById("longBreakButton");

let colors = [];

for (let i = 0; i < 6; i++) {
    colors.push(document.getElementById(`color${i+1}`));
    colors[i].onclick = ()=>changeBackgroundColor(colors[i].style.backgroundImage, i);
}

let studyTime = 60*25*1000; // 25 min
let breakTime = 60*5*1000; // 5 min
let longBreakTime = 60*15*1000; // 15 min

let initialTime;
let timePassed;
let timeLeft;
let desiredTime =studyTime;

let pomoNum = [true, 1]; // [bool(isItStudyTime), int(numberOfPomodoro)]
let stopPomodoro = false;

let audio = new Audio("sound.wav");

let timeLeftInMin;
let timeLeftInSec;

pomodoroTimer.onclick= pomodoroTimerClicked;

studyButton.onclick = studyTimeStart;
breakButton.onclick = breakTimeStart;
longBreakButton.onclick = longBreakTimeStart;

function pomodoroTimerClicked(){
    initialTime = new Date().getTime();
    pomodoroTimer.onclick=stopPomodoroTimer;
    stopPomodoro = false;
    update();
}

function studyTimeStart() {
    pomoNum[0] = true;
    
    desiredTime = studyTime;

    studyButton.style.backgroundColor = "brown";
    breakButton.style.backgroundColor = "transparent";
    longBreakButton.style.backgroundColor = "transparent";
    pomodoroTimerClicked();
}
function breakTimeStart() {
    pomoNum[0] = false;
    desiredTime = breakTime;

    studyButton.style.backgroundColor = "transparent";
    breakButton.style.backgroundColor = "brown";
    longBreakButton.style.backgroundColor = "transparent";
    pomodoroTimerClicked();
}
function longBreakTimeStart() {
    pomoNum[0] = false;
    desiredTime = longBreakTime;

    studyButton.style.backgroundColor = "transparent";
    breakButton.style.backgroundColor = "transparent";
    longBreakButton.style.backgroundColor = "Brown";
    pomodoroTimerClicked();
}

function update() {
    timePassed = new Date().getTime()-initialTime;
    timeLeft = desiredTime - timePassed;
    if (stopPomodoro===true) {
        desiredTime = timeLeft;
    }
    else if (timeLeft>0) {
        updatePomodoroDisplay();
        setTimeout(update, 50);
    }
    else if (timeLeft<=0) {
        audio.play();
        if (pomoNum[0] === true && pomoNum[0]%4!== 0) {
            breakTimeStart();
        }
        else if (pomoNum[0] === false) {
            studyTimeStart();
            pomoNum[1] +=1;
            pomodoroNumber.innerHTML = `Pomodoro #${pomoNum[1]}`;
        }
        else if (pomoNum[0] === true && pomoNum[0]%4=== 0) {
            longBreakTimeStart();
        }
    }
}

function updatePomodoroDisplay() {
    timeLeftInMin = Math.floor(timeLeft/60000)
    timeLeftInSec = Math.floor((timeLeft-(timeLeftInMin*60000))/1000)
    if (timeLeftInMin<=9) {
        timeLeftInMin = `0${timeLeftInMin}`
    }
    if (timeLeftInSec<=9) {
        timeLeftInSec = `0${timeLeftInSec}`
    }
    pomodoroTimer.innerHTML = `${timeLeftInMin}:${timeLeftInSec}`;
}

function changeBackgroundColor(image, i) {
    console.log("image:" + image)
    for (let index = 0; index < 6; index++) {
        colors[index].style.borderColor = 'white';
    }
    colors[i].style.borderColor = 'brown';
    switch (i) {
        case 0:
            document.body.style.backgroundImage = 'linear-gradient(rgb(156, 5, 156), rgba(16, 16, 220, 0.647), cyan)';
            break;
        case 1:
            document.body.style.backgroundImage = 'linear-gradient(red, rgb(255, 56, 0),orange, gold, yellow)';
            break;
        case 2:
            document.body.style.backgroundImage = 'linear-gradient(rgb(159, 125, 51), rgb(169, 92, 110), rgb(179, 59, 179))';
            break;
        case 3:
            document.body.style.backgroundImage = 'linear-gradient(rgba(184, 29, 163, 0.7), rgba(127, 73, 226, 0.661),rgba(99, 189, 222, 0.86), rgba(137, 212, 137, 0.76))';
            break;
        case 4:
            document.body.style.backgroundImage = 'linear-gradient(rgb(180, 45, 45),rgba(214, 74, 74, 0.9), rgba(167, 98, 131, 0.9), rgb(211, 69, 137))';
            break;
        case 5:
            document.body.style.backgroundImage = 'linear-gradient(rgb(15, 26, 123), rgb(6, 6, 178), blue, rgba(0, 132, 255, 0.822), rgb(17, 230, 230))';
            break;
    
        default:
            break;
    }
}

function stopPomodoroTimer() {
    pomodoroTimer.onclick= pomodoroTimerClicked;
    stopPomodoro = true;
}