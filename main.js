let btn = document.getElementById('btn');
function getEndOfDay(dayData) {
    let now = new Date();
    let endOfDay = new Date(new Date(now.getFullYear(), now.getMonth(), now.getDate() + dayData) - 1);
    return endOfDay.getTime();
}
function investHours(weatherData, classInner) {
    let timeTd = document.createElement('td');

    let time = new Date(weatherData.dt * 1000);
    let hours = time.getHours()
    hours = `${hours}`.padStart(2, '0')
    let minutes = time.getMinutes()
    minutes = `${minutes}`.padStart(2, '0')
    let finalTime = hours + ':' + minutes;
    timeTd.innerHTML = finalTime; 

    document.querySelector(classInner).appendChild(timeTd);
}
function investTemperature(weatherData, classInner) {
    let timeWeatherTd = document.createElement('td');

    let weather = Math.round(weatherData.main.temp - 273)
    let timeWeather = weather + '°';
    if (weather > 0) {
        timeWeather = '+' + timeWeather;
    }
    timeWeatherTd.innerHTML = timeWeather;
    document.querySelector(classInner).appendChild(timeWeatherTd);

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
function createCard(indexOfCard) {
    let dayCard = document.createElement('div');
    dayCard.classList.add('card')
    dayCard.id = 'card';
    let dayCardInner = 
    `<div class="card-content">
        <h3 class="day"></h3>
        <table class="day-temperature">
            <tr class="time time_${indexOfCard}">
            </tr>
            <tr class="time-temperature time-temperature_${indexOfCard}">
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
        document.querySelectorAll('.card').
        
        document.querySelector('.card-wrapper').classList.add('active');

        let weatherList = res.list;

        document.querySelector('.city-name').innerHTML = res.city.name;
        document.querySelector('.state').innerHTML = weatherList[0].weather[0].main
   
        let endOfDay1 = Math.round((getEndOfDay(1))/1000);
        let endOfDay2 = Math.round((getEndOfDay(2))/1000);
        let endOfDay3 = Math.round((getEndOfDay(3))/1000);

        let weatherListToday = weatherList.filter((weatherData) => weatherData.dt <= endOfDay1)
        let weatherListSecondDay = weatherList.filter((weatherData) => weatherData.dt <= endOfDay2 && weatherData.dt > endOfDay1)
        let weatherListThirdDay = weatherList.filter((weatherData) => weatherData.dt <= endOfDay3 && weatherData.dt > endOfDay2)
        
        let currentDay = new Date(weatherListToday[0].dt * 1000).getDay();
        currentDay = days[currentDay];
        document.querySelector('.day').innerHTML = currentDay;

        // let indexOfCard = 1;
        // createCard(indexOfCard);
        for (let index = 1; index <= 3; index++) {
            createCard(index);
            switch(index) {
                case 1: 
                    weatherListToday.forEach(weatherData => {
                        investHours(weatherData, '.time_' + index);
                        investTemperature(weatherData, '.time-temperature_' + index);
                    });
                    break;
                case 2:
                    weatherListSecondDay.forEach(weatherData => {
                        investHours(weatherData, '.time_' + index);
                        investTemperature(weatherData, '.time-temperature_' + index);
                    });
                    break;
                case 3:
                    weatherListThirdDay.forEach(weatherData => {
                        investHours(weatherData, '.time_' + index);
                        investTemperature(weatherData, '.time-temperature_' + index);
                    });
                    break;
            }
        }





    })
})    
