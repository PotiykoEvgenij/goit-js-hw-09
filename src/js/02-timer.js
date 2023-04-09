import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const datetimePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

Notiflix.Notify.init({
  position: 'center-top',
  distance: '10px',
  borderRadius: '5px',
  width: '300px',
  opacity: 0.8,
  timeout: 3000,
});

const datePicker = flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate.getTime() < Date.now()) {
        Notiflix.Notify.warning('Please choose a date in the future');
    //     Notiflix.Notify.warning({
    //     message: 'Please choose a date in the future',
    //     position: 'center-top',
    // });
      startBtn .disabled = true;
    } else {
      startBtn .disabled = false;
    }
  },
});

let countdownIntervalId;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function updateTimer() {
    const now = new Date().getTime();
    const countDownDate = new Date(datetimePicker.value).getTime();
    const distance = countDownDate - now;

    if (distance < 0) {
        clearInterval(countdownIntervalId);
        return;
    }

    const { days, hours, minutes, seconds } = convertMs(distance);

    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
};

startBtn.addEventListener('click', () => {
    clearInterval(countdownIntervalId);
    countdownIntervalId = setInterval(updateTimer, 1000);
});