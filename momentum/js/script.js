const time = document.querySelector('.time');
const dateItem = document.querySelector('.date');
const greetingItem = document.querySelector('.greeting');
const inputName = document.querySelector('.name');
const inputCity = document.querySelector('.city');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const weatherError = document.querySelector('.weather-error');
const weatherTemperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherWind = document.querySelector('.wind');
const weatherHumidity = document.querySelector('.humidity');
const quoteText = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');
const quoteChange = document.querySelector('.change-quote');


function currentTime () {
    const date = new Date();
    time.textContent = date.toLocaleTimeString('en-GB');
    setTimeout(currentTime, 1000);
}

function currentDate () {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    dateItem.textContent = date.toLocaleDateString('en-GB', options);
    setTimeout(currentDate, 1000);
}

function getTimeOfDay() {
    const date = new Date();
    const h = date.getHours();
    let timesOfDay;
    if (h >= 5 && h <= 11) {
        timesOfDay = 'morning';
    } else if (h > 11 && h < 5) {
        timesOfDay = 'afternoon';
    } else if (h >= 5 && h <= 23) {
        timesOfDay = 'evening';
    } else {
        timesOfDay = 'night';
    }
    return timesOfDay;
}

function greetingTime() {
    greetingItem.textContent = `Good ${getTimeOfDay()}`;
    setTimeout(greetingTime, 1000);
}

function setUserName() {
    localStorage.setItem('city', inputCity.value);
    localStorage.setItem('userName', inputName.value);
}

function getUserName() {
    if (localStorage.getItem('userName')) {
        inputName.value = localStorage.getItem('userName');
    }
    if (localStorage.getItem('city')) {
        inputCity.value = localStorage.getItem('city');
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }

function getSliderLink() {
    const img = new Image();
    let link = `https://raw.githubusercontent.com/GaliyaZ/stage1-tasks/assets/images/${getTimeOfDay()}/${String(num).padStart(2, '0')}.jpg`;
    img.src = link;
    img.style.display = 'none';
    document.body.appendChild(img);
    img.onload = () => {
        document.body.style.backgroundImage = `url(${link})`;
    }
}

function getSlideNext() {
    const max = 20;
    const min = 1;
    num = num + 1 > 20 ? 1 : num + 1;
    getSliderLink();
}

function getSlidePrev() {
    const max = 20;
    const min = 1;
    num = num - 1 < 1 ? 20 : num - 1;
    getSliderLink();
}

async function getWether() {
    const rskey = '83cffe1d50ea4d6a9209e2a596c9b96d';
    const link = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&lang=en&appid=${rskey}&units=metric`;
    const res = await fetch(link);
    if (res.ok) {
        const data = await res.json();
        // console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        weatherTemperature.textContent = `${data.main.temp}°C`;
        weatherDescription.textContent = data.weather[0].description;
    } else {
        weatherError.textContent = 'Error! City not found or App not available'
    }
}

async function getQuote() {
    const link = '../assets/data.json';
    const res = await fetch(link);
    if (res.ok) {
        const data = await res.json();
        // console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
        quoteText.textContent = data[quoteNum].text;
        quoteAuthor.textContent = data[quoteNum].author;
    } else {
        weatherError.textContent = 'Error! City not found or App not available'
    }
}

function newQuote() {
    quoteNum = getRandomInt(0, 19);
    getQuote();
}

let num = getRandomInt(1, 21);
let quoteNum = getRandomInt(0, 19);

getSliderLink();
getQuote();

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
quoteChange.addEventListener('click', newQuote)


window.addEventListener('load', getUserName);
window.addEventListener('beforeunload', setUserName);
currentTime();
currentDate();
greetingTime();
getWether();


