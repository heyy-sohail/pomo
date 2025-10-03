/* script.js - Timer functionality */

const display = document.getElementById('display');
const editBtn = document.getElementById('editBtn');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const stopBtn = document.getElementById('stopBtn');

let defaultMinutes = 25; // default pomodoro length
let remaining = defaultMinutes * 60;
let timerId = null;
let running = false;

function formatTime(sec){
  const m = Math.floor(sec/60);
  const s = sec % 60;
  return String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
}

function updateDisplay(){
  display.textContent = formatTime(remaining);
}

function startTimer(){
  if(running) return;
  if(remaining <= 0) remaining = defaultMinutes * 60;
  running = true;
  startBtn.textContent = 'Running';
  timerId = setInterval(()=>{
    if(remaining <= 0){
      clearInterval(timerId);
      timerId = null;
      running = false;
      startBtn.textContent = 'Start';
      // flash effect
      flashDisplay();
      return;
    }
    remaining -= 1;
    updateDisplay();
  }, 1000);
}

function stopTimer(){
  if(timerId){
    clearInterval(timerId);
    timerId = null;
  }
  running = false;
  startBtn.textContent = 'Start';
}

function resetTimer(){
  stopTimer();
  remaining = defaultMinutes * 60;
  updateDisplay();
}

function editTimer(){
  const input = prompt("Set timer length in minutes:", String(defaultMinutes));
  if(input === null) return;
  const n = parseInt(input);
  if(Number.isNaN(n) || n <= 0){
    alert("Please enter a positive integer number of minutes.");
    return;
  }
  defaultMinutes = n;
  remaining = defaultMinutes * 60;
  updateDisplay();
  stopTimer();
}

function flashDisplay(){
  const original = display.style.color;
  let times = 0;
  const id = setInterval(()=>{
    display.style.color = (display.style.color === 'white') ? '' : 'white';
    times++;
    if(times > 6){
      clearInterval(id);
      display.style.color = original;
    }
  }, 300);
}

// Attach events
editBtn.addEventListener('click', editTimer);
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

// Initialize
updateDisplay();
