const button = document.getElementById('btn').onclick = function() {getGeoData()};
const input = document.getElementById('search-input');
const currentLocation = document.getElementById('.location');
const currentTemp = document.getElementById('temp');
const currentDesc = document.getElementById('desc');
const currentImg = document.getElementById('current-img');
const currentDetails = document.getElementById('current-details');
const currentImgDiv = document.getElementById('current-img-div');
const futureData = document.getElementById('future-data');

const api_key = 'eb6aea2873abfd64f82d9e25b6cc5d79';





getData();
function getData() {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

        let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${api_key}`).then(res => res.json()).then(data => {
            console.log(data)
            showData(data);
        })
    })
}

function getGeoData() {
    const inputValue = document.getElementById('search-input').value;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${api_key}`).then(res => res.json()).then(data => {
            console.log(data)
        let { lat, lon } = data[0];
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${api_key}`).then(res => res.json()).then(data => {
            console.log(data)
            showData(data);
        })
        })

}

function showData(data) {
    
    let { temp, humidity, pressure} = data.current;
    let { description, icon} = data.current.weather[0];
   
    let { timezone } = data;
    
    
    
    currentDetails.innerHTML =
        `<div id="location" class="location pb-2">${timezone}</div>
                    <div id="temp" class=" temp pb-2">Temperature ${Math.floor(temp)} &deg;</div>
                    <div id="humid" class=" humid pb-2"> Humidity ${Math.floor(humidity)} %</div>
                    <div id="pres" class=" pres pb-2"> Pressure ${Math.floor(pressure)} hPa</div>
                    
                    <div id="desc" class=" desc pb-2">${description}</div>`;
    currentImgDiv.innerHTML =
        `<img id="current-img" class="current-img" src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Image" width="200" height="200">`;
    
    
  let futureForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
           
        }else{
            futureForcast += `
            <div class="col-4">
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${Math.floor(day.temp.night)}&#176;C</div>
                <div class="temp">Day - ${Math.floor(day.temp.day)}&#176;C</div>
            </div>
            
            `
        }
    })


    futureData.innerHTML = futureForcast;
}
