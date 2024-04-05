let btn = document.getElementById('btn');
function getEndOfDay(dayData) {
    let now = new Date();
    let endOfDay = new Date(new Date(now.getFullYear(), now.getMonth(), now.getDate() + dayData) - 1);
    return endOfDay.getTime();
}
function investHours(weatherData) {
    let timeTd = document.createElement('td');

    let time = new Date(weatherData.dt * 1000);
    let hours = time.getHours()
    hours = `${hours}`.padStart(2, '0')
    let minutes = time.getMinutes()
    minutes = `${minutes}`.padStart(2, '0')
    let fullTime = hours + ':' + minutes;
    timeTd.innerHTML = fullTime; 

    return timeTd
}
function investTemperature(weatherData) {
    let timeWeatherTd = document.createElement('td');

    let temperature = Math.round(weatherData.main.temp - 273)
    let timeWeather = temperature + '°';
    if (temperature > 0) {
        timeWeather = '+' + timeWeather;
    }
    timeWeatherTd.innerHTML = timeWeather;
    
    return timeWeatherTd
}
function investDay(weatherListArray, weatherDataIndex) {
    let thisDayUnix = weatherListArray[weatherDataIndex][0].dt;
    let thisDay = new Date(thisDayUnix * 1000).getDay();
    thisDay = days[thisDay];
    return thisDay;
}
const days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
}
function createCard() {
    let dayCard = document.createElement('div');
    dayCard.classList.add('card')
    dayCard.id = 'card';
    let dayCardInner = 
    `<div class="card-content">
        <h3 class="day"></h3>
        <table class="day-temperature">
            <tr class="time">
            </tr>
            <tr class="time-temperature">
            </tr>
        </table>
    </div>
    <img src="icons8-дождь-96.png" alt="" class="day-weather">`;
    dayCard.innerHTML = dayCardInner;
    document.querySelector('.card-wrapper').appendChild(dayCard);
}
if (typeof document.querySelector('.card-wrapper').innerHTML == '') {
    console.log(typeof document.querySelector('.card-wrapper').innerHTML);
}

function deleteCard() {
    let containsElements = document.querySelector('.card-wrapper').contains(document.querySelector('.card'))
    if (containsElements == true) {
        document.querySelector('.card-wrapper').innerHTML = '';
        document.querySelector('.city-name').innerHTML = '';
        document.querySelector('.state').innerHTML = '';
        document.querySelector('.time').innerHTML = '';
        document.querySelector('.time-temperature').innerHTML = '';
    }
}
function activateMaincard(res, weatherList) {
    document.querySelector('.city-name').innerHTML = res.city.name;
    document.querySelector('.state').innerHTML = weatherList[0].weather[0].main;
    document.querySelector('.main-card').classList.add('active');
}
let btnStatus = false;
btn.addEventListener('click', function() {
    deleteCard()
    city = document.getElementById('input').value
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=1d0bfe9ca98d98c1185cf8a1d898a737`;
    fetch(url)
    .then(function(resp) {
        return resp.json(); 
    })
    .then(function(res) {
        let weatherList = res.list;
        activateMaincard(res, weatherList) 

        let endOfDay1 = Math.round((getEndOfDay(1))/1000),
            endOfDay2 = Math.round((getEndOfDay(2))/1000),
            endOfDay3 = Math.round((getEndOfDay(3))/1000);

        let weatherListMain = weatherList.filter((weatherData) => weatherData.dt <= endOfDay1),
            weatherList1 = weatherList.filter((weatherData) => weatherData.dt <= endOfDay2 && weatherData.dt > endOfDay1),
            weatherList2 = weatherList.filter((weatherData) => weatherData.dt <= endOfDay3 && weatherData.dt > endOfDay2),
            weatherListArray = [weatherListMain, weatherList1, weatherList2];

        for (let index = 0; index <= weatherListArray.length - 1; index++) {
            let time = document.querySelectorAll('.time'),
                thisTime = time[index];
            if (thisTime == undefined) {
                createCard();
                time = document.querySelectorAll('.time');
                thisTime = time[index];
            }
            let temperature = document.querySelectorAll('.time-temperature'),
                thisTemperature = temperature[index];
            let day = document.querySelectorAll('.day'),
                thisDay = day[index];
            thisDay.innerHTML = investDay(weatherListArray, index)
            investDay(weatherListArray, index)
            weatherListArray[index].forEach(weatherList => {
                thisTemperature.appendChild(investTemperature(weatherList));
                thisTime.appendChild(investHours(weatherList));
            });
        }
    })
})    
