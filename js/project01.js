// Select elements
const clockElement = document.getElementById("digital-clock");
const timeFormatSelect = document.getElementById("time-format");
const fontSizeSlider = document.getElementById("font-size");
const clockColorPicker = document.getElementById("clock-color");
const setAlarmButton = document.getElementById("set-alarm");
const alarmList = document.getElementById("alarm-list");

let alarms = JSON.parse(localStorage.getItem("alarms")) || [];
let timeFormat = localStorage.getItem("timeFormat") || "12";
let clockColor = localStorage.getItem("clockColor") || "#2196F3";
let fontSize = localStorage.getItem("fontSize") || "50";

// Apply saved preferences
timeFormatSelect.value = timeFormat;
clockElement.style.color = clockColor;
clockElement.style.fontSize = `${fontSize}px`;
clockColorPicker.value = clockColor;
fontSizeSlider.value = fontSize;

// Save preferences to localStorage
function savePreferences() {
  localStorage.setItem("timeFormat", timeFormat);
  localStorage.setItem("clockColor", clockColor);
  localStorage.setItem("fontSize", fontSize);
  localStorage.setItem("alarms", JSON.stringify(alarms));
}

// Apply a glow animation to the clock every second
function animateClockGlow() {
  clockElement.style.transform = "scale(1.01)";
  clockElement.style.filter = "brightness(1.2)";
  setTimeout(() => {
    clockElement.style.transform = "scale(1)";
    clockElement.style.filter = "brightness(1)";
  }, 200);
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  if (timeFormat === "12") {
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    clockElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
  } else {
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
  }

  checkAlarms(hours, minutes, seconds);
  animateClockGlow();
}


// Check if an alarm should trigger
function checkAlarms(hours, minutes, seconds) {
  const currentTime = `${String(hours).padStart(2, "0")}:${minutes}`;
  alarms.forEach((alarm, index) => {
    if (alarm.time === currentTime && seconds === "00") {
      alert(`Alarm Triggered: ${alarm.label}`);
      removeAlarm(index);
    }
  });
}

// Add a new alarm
function addAlarm() {
  const alarmTime = prompt("Enter alarm time (HH:MM in 24-hour format):");
  if (!alarmTime || !/^\d{2}:\d{2}$/.test(alarmTime)) {
    alert("Invalid time format. Please use HH:MM.");
    return;
  }
  const alarmLabel = prompt("Enter a label for the alarm:");
  alarms.push({ time: alarmTime, label: alarmLabel || "Alarm" });
  savePreferences();
  renderAlarms();
}

// Remove an alarm
function removeAlarm(index) {
  alarms.splice(index, 1);
  savePreferences();
  renderAlarms();
}

// Render alarms in the list
function renderAlarms() {
  alarmList.innerHTML = alarms
    .map(
      (alarm, index) => `
    <li>
      ${alarm.time} - ${alarm.label}
      <button onclick="removeAlarm(${index})">Remove</button>
    </li>
  `
    )
    .join("");
}

// Event listeners
timeFormatSelect.addEventListener("change", (e) => {
  timeFormat = e.target.value;
  savePreferences();
});

fontSizeSlider.addEventListener("input", (e) => {
  fontSize = e.target.value;
  clockElement.style.fontSize = `${fontSize}px`;
  savePreferences();
});

clockColorPicker.addEventListener("input", (e) => {
  clockColor = e.target.value;
  clockElement.style.color = clockColor;
  savePreferences();
});

setAlarmButton.addEventListener("click", addAlarm);

// Initialize clock and alarms
renderAlarms();
setInterval(updateClock, 1000);
updateClock();
