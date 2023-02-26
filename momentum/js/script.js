import playList from "./playList.js";
import greetingTranslation from "./greetingTranslation.js";

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
const audio = document.querySelector('audio');
const audioPlay = document.querySelector('.play');
const audioNext = document.querySelector('.play-next');
const audioPrev = document.querySelector('.play-prev');
const audioList = document.querySelector('.play-list');
const progressContainer = document.querySelector('.progress-container');
const progress = document.getElementById('progress');
const currentTimeElem = document.getElementById('current-time');
const durationElem = document.getElementById('duration');
const audioName = document.querySelector('.track-name');
const ruBtn = document.querySelector('.ru');
const enBtn = document.querySelector('.en');
let lang = document.querySelector('.lang-active').textContent;


function currentTime() {
    const date = new Date();
    const options = {hour: 'numeric', minute: 'numeric', second: 'numeric'};
    time.textContent = date.toLocaleTimeString(`${lang == 'en' ? 'en-US' : 'ru-RU'}`, options);
    setTimeout(currentTime, 1000);
}

function currentDate() {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    dateItem.textContent = date.toLocaleDateString(`${lang == 'en' ? 'en-GB' : 'ru-RU'}`, options);
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
    greetingItem.textContent = `${greetingTranslation[lang][getTimeOfDay()]}`;
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

let cityName = inputCity.value;
function getCity() {
    cityName = inputCity.value;
    if (!inputCity.value && localStorage.getItem('city')) {
        cityName = localStorage.getItem('city');
    }
}

async function getWether() {
    const rskey = '83cffe1d50ea4d6a9209e2a596c9b96d';
    const link = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=en&appid=${rskey}&units=metric`;
    const res = await fetch(link);
    if (res.ok) {
        weatherError.textContent = '';
        const data = await res.json();
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        weatherTemperature.textContent = `${data.main.temp}°C`;
        weatherDescription.textContent = data.weather[0].description;
        weatherWind.textContent = `Wind: ${data.wind.speed} m/s`;
        weatherHumidity.textContent = `Humidity: ${data.main.humidity}%`;
    } else {
        if (localStorage.getItem('city')) {
            cityName = localStorage.getItem('city');
            getWether();
        } else {
            weatherError.textContent = 'Error! City not found or App not available';
        }
    }
}

async function getQuote() {
    const link = './assets/data.json';
    const res = await fetch(link);
    if (res.ok) {
        const data = await res.json();
        // console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
        quoteText.textContent = data[quoteNum].text;
        quoteAuthor.textContent = data[quoteNum].author;
    } else {
        quoteText.textContent = 'Error! Quote not found or App not available'
    }
}

function newQuote() {
    quoteNum = getRandomInt(0, 19);
    getQuote();
}

function playAudio() {
    // audio.currentTime = 0;
    setAudioSrc();
    if (isPlay) {
        audio.pause();
        audioPlay.classList.toggle('pause');
        isPlay = !isPlay;
    } else {
        audio.play();
        audioPlay.classList.toggle('pause');
        isPlay = !isPlay;
    }
}

function setAudioSrc() {
    const src = playList[audioNum].src;
    audio.src = src;
    audioItems.forEach((element, i) => {
        if (i === audioNum) {
            element.classList.add('item-active');
        } else {
            element.classList.remove('item-active');
        }
    })
    setDuration();
}

function nextAudio() {
    if (playList.length === audioNum + 1) {
        audioNum = 0;
    } else {
        audioNum = audioNum + 1;
    }
    setAudioSrc();
    if (isPlay) {
        audio.play();
    } else {
        audio.pause();
    }
}

function prevAudio() {
    if (0 === audioNum) {
        audioNum = playList.length - 1;
    } else {
        audioNum = audioNum - 1;
    }
    setAudioSrc();
}

function createItems() {
    playList.forEach((element, index) => {
        const li = document.createElement('li');
        li.textContent = playList[index].title;
        li.classList.add('play-item');
        audioItems.push(li);
        audioList.appendChild(li);
    });
}

function setDuration() {
    audioName.textContent = playList[audioNum].title;
    durationElem.textContent = playList[audioNum].duration;
}

function parseDuration(str) {
    let time = str.split(':');
    let res = 0;
    time.forEach((item, index) => {
        if (index === 0) {
            res += Number(item)*60;
        } else {
            res += Number(item);
        }
    })
    return res;
}

function parseTime(seconds) {
    let res = '';
    res = `${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2, '0')}`;
    return res;
}

function langChange(lang) {
    if (lang == 'en') {
        inputName.placeholder = 'Enter your name';
    } else {
        inputName.placeholder = 'Введите свое имя';
    }
    
}

let num = getRandomInt(1, 21);
let quoteNum = getRandomInt(0, 19);
let isPlay = false;
let audioNum = 0;
const audioItems = [];
audio.volume = 0.5;

langChange(lang);
getSliderLink();
getQuote();
createItems();
setDuration();

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
quoteChange.addEventListener('click', newQuote);
inputCity.addEventListener('input', () => {
    getCity();
    getWether();
});
audioPlay.addEventListener('click', playAudio);
audioNext.addEventListener('click', nextAudio);
audioPrev.addEventListener('click', prevAudio);
audio.addEventListener('ended', nextAudio);
progressContainer.addEventListener('click', (event) => {
    const widthAll = progressContainer.clientWidth;
    const progressWidth = event.offsetX;
    const durationAll = isPlay ? audio.duration : parseDuration(playList[audioNum].duration);
    audio.currentTime = durationAll / widthAll * progressWidth;
    progress.style.width = `${progressWidth*100/widthAll}%`; 
})
audio.addEventListener('timeupdate', () => {
    const durationAll = isPlay ? audio.duration : parseDuration(playList[audioNum].duration);
    progress.style.width = `${audio.currentTime * 100 / durationAll}%`;
    currentTimeElem.textContent = parseTime(audio.currentTime);
});
ruBtn.addEventListener('click', () => {
    enBtn.classList.remove('lang-active');
    ruBtn.classList.add('lang-active');
    lang = 'ru';
    langChange(lang)
});
enBtn.addEventListener('click', () => {
    ruBtn.classList.remove('lang-active');
    enBtn.classList.add('lang-active');
    lang = 'en';
    langChange(lang);
})


window.addEventListener('load', getUserName);
window.addEventListener('beforeunload', setUserName);
currentTime();
currentDate();
greetingTime();
getCity();
getWether();


