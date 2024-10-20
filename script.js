const redLight = document.getElementById('red-light');
const yellowLight = document.getElementById('yellow-light');
const greenLight = document.getElementById('green-light');

const redCountdown = document.getElementById('red-countdown');
const yellowCountdown = document.getElementById('yellow-countdown');
const greenCountdown = document.getElementById('green-countdown');

const redDuration = 15;
const yellowDuration = 5;
const greenDuration = 20;

let currentCountdown = 0;
let yellowFlashInterval;

function startCountdown(element, duration, countdownElement) {
    let remainingTime = duration;
    countdownElement.textContent = remainingTime;
    
    const interval = setInterval(() => {
        remainingTime--;
        countdownElement.textContent = remainingTime;
        
        if (remainingTime <= 0) {
            clearInterval(interval);
        }
    }, 1000);

    return interval;
}

function flashYellowLight() {
    yellowFlashInterval = setInterval(() => {
        if (yellowLight.classList.contains('active')) {
            yellowLight.classList.toggle('flash');
        }
    }, 500); 
}

function stopFlashingYellowLight() {
    clearInterval(yellowFlashInterval);
    yellowLight.classList.remove('flash'); 
}

function trafficLightCycle() {
    redLight.classList.add('active');
    yellowLight.classList.remove('active');
    greenLight.classList.remove('active');

    startCountdown(redLight, redDuration, redCountdown);

    setTimeout(() => {
        redLight.classList.remove('active');
        yellowLight.classList.add('active');
        greenLight.classList.remove('active');

        startCountdown(yellowLight, yellowDuration, yellowCountdown);
        flashYellowLight();
    }, redDuration * 1000); 

    setTimeout(() => {
        stopFlashingYellowLight();

        redLight.classList.remove('active');
        yellowLight.classList.remove('active');
        greenLight.classList.add('active');

        startCountdown(greenLight, greenDuration, greenCountdown);
    }, (redDuration + yellowDuration) * 1000); 

    setTimeout(() => {
        trafficLightCycle();
    }, (redDuration + yellowDuration + greenDuration) * 1000); 
}
trafficLightCycle();