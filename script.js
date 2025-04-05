let is24Hour = false;
let alarmTime = null;

function updateClock() {
    const now = new Date();
    const timezone = document.getElementById('timeZoneSelect').value;

    const localetime = timezone === 'local'
        ? now
        : new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));

    const date = new Date(localetime);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const amPm = hours >= 12 ? 'PM' : 'AM';

    if (!is24Hour) {
        hours = hours % 12 || 12;
    }

    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    const timeString = `${paddedHours}:${paddedMinutes}:${paddedSeconds}${is24Hour ? '' : ' ' + amPm}`;
    const dateString = date.toDateString();

    document.getElementById('Clock').textContent = timeString;
    document.getElementById('date').textContent = dateString;

    checkAlarm(paddedHours, paddedMinutes, amPm);
}

function toggleFormat() {
    is24Hour = document.getElementById('formatToggle').checked;
}

function toggleTheme() {
    const isDark = document.getElementById('themeToggle').checked;
    document.body.className = isDark ? 'dark-mode' : 'light-mode';
}

function setAlarm() {
    const input = document.getElementById('alarmTime').value;

    if (!input) {
        document.getElementById('alarmStatus').textContent = 'Please select a time.';
        return;
    }

    alarmTime = input;
    document.getElementById('alarmStatus').textContent = `Alarm is set for ${input}.`;
}

function checkAlarm(hours, minutes, amPm) {
    if (!alarmTime) return;

    let [alarmHour, alarmMinute] = alarmTime.split(':');

    if (!is24Hour) {
        const currentTime = `${hours}:${minutes} ${amPm}`; 
        const alarmFormatted = `${String(alarmHour).padStart(2, '0')}:${String(alarmMinute).padStart(2, '0')} ${amPm}`;

        if (currentTime === alarmFormatted) {
            alert("Alarm Ringing!");
            alarmTime = null;
            document.getElementById('alarmStatus').textContent = '';
        }
    } else {
        const currentTime = `${hours}:${minutes}`;
        const alarmFormatted = `${String(alarmHour).padStart(2, '0')}:${String(alarmMinute).padStart(2, '0')}`;

        if (currentTime === alarmFormatted) {
            alert("Alarm Ringing!");
            alarmTime = null;
            document.getElementById('alarmStatus').textContent = '';
        }
    }
}

document.getElementById('formatToggle').addEventListener('change', toggleFormat);
document.getElementById('themeToggle').addEventListener('change', toggleTheme);
document.getElementById('timeZoneSelect').addEventListener('change', updateClock);

setInterval(updateClock, 1000);
updateClock();
