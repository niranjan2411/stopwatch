
const themeBtn = document.getElementById('themeBtn');
const html = document.documentElement;


const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});


const display = document.getElementById('display');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;


function loadState() {
    const savedState = localStorage.getItem('stopwatchState');
    if (savedState) {
        const state = JSON.parse(savedState);
        isRunning = state.isRunning;
        elapsedTime = state.elapsedTime;
        
        if (isRunning) {
            startTime = Date.now() - elapsedTime;
            startTimer();
            toggleButtons(true);
        } else {
            updateDisplay(elapsedTime);
        }
    }
}


function saveState() {
    const state = {
        isRunning: isRunning,
        elapsedTime: isRunning ? Date.now() - startTime : elapsedTime
    };
    localStorage.setItem('stopwatchState', JSON.stringify(state));
}


function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000));
    
    return {
        time: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
        ms: String(milliseconds).padStart(3, '0')
    };
}


function updateDisplay(ms) {
    const formatted = formatTime(ms);
    display.textContent = formatted.time;
    millisecondsDisplay.textContent = formatted.ms;
}


function startTimer() {
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay(elapsedTime);
        saveState();
    }, 10); 
}

function toggleButtons(running) {
    if (running) {
        startBtn.style.display = 'none';
        stopBtn.style.display = 'inline-block';
    } else {
        startBtn.style.display = 'inline-block';
        stopBtn.style.display = 'none';
    }
}

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        isRunning = true;
        startTimer();
        toggleButtons(true);
        saveState();
    }
});

stopBtn.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        toggleButtons(false);
        saveState();
    }
});

resetBtn.addEventListener('click', () => {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    startTime = 0;
    updateDisplay(0);
    toggleButtons(false);
    saveState();
});

document.addEventListener('visibilitychange', () => {
    if (!document.hidden && isRunning) {
        const savedState = JSON.parse(localStorage.getItem('stopwatchState'));
        if (savedState && savedState.isRunning) {
            elapsedTime = savedState.elapsedTime;
            startTime = Date.now() - elapsedTime;
        }
    }
});

window.addEventListener('beforeunload', () => {
    saveState();
});

loadState();
