// Theme Management
const themeBtn = document.getElementById('themeBtn');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Stopwatch Logic
const display = document.getElementById('display');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const pipBtn = document.getElementById('pipBtn');

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

// Storage expiry: 7 days in milliseconds
const EXPIRY_DAYS = 7;
const EXPIRY_TIME = EXPIRY_DAYS * 24 * 60 * 60 * 1000;

// Set item with expiry
function setWithExpiry(key, value, ttl = EXPIRY_TIME) {
    const now = Date.now();
    const item = {
        value: value,
        expiry: now + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
}

// Get item with expiry check
function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    
    if (!itemStr) {
        return null;
    }
    
    try {
        const item = JSON.parse(itemStr);
        const now = Date.now();
        
        // Check if expired
        if (now > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        
        return item.value;
    } catch (e) {
        // If parsing fails, remove corrupted data
        localStorage.removeItem(key);
        return null;
    }
}

// Load saved stopwatch state
function loadState() {
    const savedState = getWithExpiry('stopwatchState');
    
    if (savedState) {
        isRunning = savedState.isRunning;
        elapsedTime = savedState.elapsedTime;
        
        if (isRunning) {
            startTime = Date.now() - elapsedTime;
            startTimer();
            toggleButtons(true);
        } else {
            updateDisplay(elapsedTime);
        }
    }
}

// Save stopwatch state with expiry
function saveState() {
    const state = {
        isRunning: isRunning,
        elapsedTime: isRunning ? Date.now() - startTime : elapsedTime
    };
    setWithExpiry('stopwatchState', state);
}

// Format time display
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

// Update display
function updateDisplay(ms) {
    const formatted = formatTime(ms);
    display.textContent = formatted.time;
    millisecondsDisplay.textContent = formatted.ms;
}

// Timer function
function startTimer() {
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay(elapsedTime);
        saveState();
    }, 10);
}

// Toggle button visibility
function toggleButtons(running) {
    if (running) {
        startBtn.style.display = 'none';
        stopBtn.style.display = 'inline-block';
    } else {
        startBtn.style.display = 'inline-block';
        stopBtn.style.display = 'none';
    }
}

// Event Listeners
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
    // Confirmation dialog
    const confirmReset = confirm('Reset stopwatch? This will clear all stored data.');
    
    if (confirmReset) {
        isRunning = false;
        clearInterval(timerInterval);
        elapsedTime = 0;
        startTime = 0;
        updateDisplay(0);
        toggleButtons(false);
        
        // Clear localStorage completely for stopwatch
        localStorage.removeItem('stopwatchState');
    }
});

// Picture-in-Picture mode for always-on-top display
pipBtn.addEventListener('click', async () => {
    try {
        // Create a canvas to render the timer
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 360;
        const ctx = canvas.getContext('2d');
        
        // Style canvas
        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--bg-color');
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-color');
        ctx.font = 'bold 80px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Stream canvas
        const stream = canvas.captureStream(30);
        const video = document.createElement('video');
        video.srcObject = stream;
        video.muted = true;
        await video.play();
        
        // Enter PiP mode
        await video.requestPictureInPicture();
        
        // Update canvas continuously
        const updateCanvas = () => {
            ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--bg-color');
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-color');
            
            const formatted = formatTime(elapsedTime);
            ctx.font = 'bold 80px monospace';
            ctx.fillText(formatted.time, canvas.width / 2, canvas.height / 2 - 30);
            ctx.font = 'bold 40px monospace';
            ctx.fillText(formatted.ms, canvas.width / 2, canvas.height / 2 + 40);
            
            requestAnimationFrame(updateCanvas);
        };
        updateCanvas();
        
    } catch (error) {
        alert('Picture-in-Picture not supported or permission denied. Use browser\'s minimize button instead.');
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && isRunning) {
        const savedState = getWithExpiry('stopwatchState');
        if (savedState && savedState.isRunning) {
            elapsedTime = savedState.elapsedTime;
            startTime = Date.now() - elapsedTime;
        }
    }
});

// Save state before page unload
window.addEventListener('beforeunload', () => {
    saveState();
});

// Clean up expired data on load
function cleanExpiredData() {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
        getWithExpiry(key); // This will auto-remove expired items
    });
}

// Initialize
cleanExpiredData();
loadState();
