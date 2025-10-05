//variables to keep track of time
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

//timer control variables
let timer = null;
let timerInterval = 5; // in milliseconds
let isRunning = false;

//DOM references elements from HTML
const root = document.documentElement;        //reference to html for CSS variables
const display = document.getElementById("display"); //main stopwatch display
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");    //list for lap times
const themeBtn = document.getElementById('themeBtn'); //theme toggle switch

//format time with leading zeros
function formatTime(h, m, s, ms) {
    return (
        String(h).padStart(2, "0") + ":" +   //hours always 2 digits
        String(m).padStart(2, "0") + ":" +   //minutes always 2 digits
        String(s).padStart(2, "0") + "." +   //seconds always 2 digits
        String(ms).padStart(3, "0")          //milliseconds always 3 digits
    );
}

//update the display element
function updateDisplay() {
    display.textContent = formatTime(hours, minutes, seconds, milliseconds);
}

//start the timer setInterval every 5ms
function startTimer() {
    if (!isRunning) {    //start if not already running
        isRunning = true;
        timer = setInterval(() => {
            milliseconds += timerInterval;   //increase ms by 5, interval is 5ms

            if (milliseconds === 1000) { //reset ms after 1000
                milliseconds = 0;
                seconds++;
            }
            if (seconds === 60) {  //reset seconds after 60
                seconds = 0;
                minutes++;
            }
            if (minutes === 60) {  //reset minutes after 60
                minutes = 0;
                hours++;
            }

            updateDisplay(); //refresh the stopwatch
        }, timerInterval); //run this block every 5ms
    }
}

//pause the timer 
function pauseTimer() {
    clearInterval(timer); //stops the timer from running
    isRunning = false;
}

//reset everything to zero
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    laps.innerHTML = "";   //clear all lap records
}

//record a lap
function addLap() {
    if (isRunning) {      //only if running
        const li = document.createElement("li");   //new list item
        li.textContent = formatTime(hours, minutes, seconds, milliseconds);
        laps.appendChild(li); //add lap time to list
    }
}

//switch theme dark and light themes
function switchTheme() {
    if (themeBtn.checked) {      //dark mode
        root.style.setProperty('--stopwatch-bg-color', '#746c6cff');
        root.style.setProperty('--secondary-color', '#e0e0e0');
        root.style.setProperty('--primary-color', '#1e1e2f');
    } else {                //light mode
        root.style.setProperty('--primary-color', '#e33838');
        root.style.setProperty('--secondary-color', '#333');
        root.style.setProperty('--stopwatch-bg-color', '#eb5f5f');
    }
}

//event listeners for buttons
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", addLap);
themeBtn.addEventListener('change', switchTheme);
