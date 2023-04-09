const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const body = document.querySelector('body');
let intervalId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
}

function startChangeBgColor() {
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtn.disabled = true;
}

function stopChangeBgColor() {
    clearInterval(intervalId);
    startBtn.disabled = false;
}

startBtn.addEventListener("click", startChangeBgColor);
stopBtn.addEventListener("click", stopChangeBgColor);
