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

btn.addEventListener('click', function() {

    city = document.getElementById('input').value
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=1d0bfe9ca98d98c1185cf8a1d898a737`;
    fetch(url)
    .then(function(resp) {
        return resp.json(); 
    })
    .then(function(res) {
        let weatherList = res.list;

        document.querySelector('.city-name').innerHTML = res.city.name;
        document.querySelector('.state').innerHTML = weatherList[0].weather[0].main;
        temperatureNow = Math.round(weatherList[0].main.temp - 273);
        if (temperatureNow > 0) {
            temperatureNow = '+' + temperatureNow;
        }
        document.querySelector('.temperature-now__tr').innerHTML = temperatureNow
        document.querySelector('.main-card').classList.add('active');

        let endOfDay1 = Math.round((getEndOfDay(1))/1000);
        let endOfDay2 = Math.round((getEndOfDay(2))/1000);
        let endOfDay3 = Math.round((getEndOfDay(3))/1000);

        let weatherList0 = weatherList.filter((weatherData) => weatherData.dt <= endOfDay1)
        let weatherList1 = weatherList.filter((weatherData) => weatherData.dt <= endOfDay2 && weatherData.dt > endOfDay1)
        let weatherList2 = weatherList.filter((weatherData) => weatherData.dt <= endOfDay3 && weatherData.dt > endOfDay2)
        let weatherListArray = [weatherList0, weatherList1, weatherList2]
        let currentDay = new Date(weatherList0[0].dt * 1000).getDay();
        currentDay = days[currentDay];
        document.querySelector('.day').innerHTML = currentDay;
        for (let index = 0; index <= 2; index++) {
            createCard();
            let time = document.querySelectorAll('.time');
            let temperature = document.querySelectorAll('.time-temperature');
            let thisTime = time[index];
            let thisTemperature = temperature[index];
            weatherListArray[index].forEach(weatherList => {
                thisTime.innerHTML += investHours(weatherList)
                // thisTemperature.innerHTML += investTemperature(weatherList)
                console.log(thisTime.innerHTML);
                console.log(investHours(weatherList));
            });
        }
    })
})    
