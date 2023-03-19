import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// all modules
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate.getTime() <= Date.now()) {
      Notiflix.Report.failure(
        'INCORRECT DATE',
        'Please choose a date in the future',
        'OK',
        );
      document.querySelector("#datetime-picker").value = "";
      document.querySelector("[data-start]").disabled = true;
    } else {
      document.querySelector("[data-start]").disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

document.querySelector("[data-start]").addEventListener("click", () => {
  const endDate = new Date(document.querySelector("#datetime-picker").value).getTime();
  const intervalId = setInterval(() => {
    const now = Date.now();
    const ms = endDate - now;
    if (ms <= 0) {
      clearInterval(intervalId);
    } else {
      const { days, hours, minutes, seconds }              = convertMs(ms);
      document.querySelector("[data-days]").textContent    = formatTime(days);
      document.querySelector("[data-hours]").textContent   = formatTime(hours);
      document.querySelector("[data-minutes]").textContent = formatTime(minutes);
      document.querySelector("[data-seconds]").textContent = formatTime(seconds);
    }
  }, 1000);
});

function formatTime(time) {
  return time.toString().padStart(2, "0");
}

function convertMs(ms) {
  const second  = 1000;
  const minute  = second * 60;
  const hour    = minute * 60;
  const day     = hour * 24;

  const days    = Math.floor(ms / day);
  const hours   = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
