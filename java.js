<section class="vh-100">
  <div class="container py-5">

    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-7 col-xl-5">

        <div id="wrapper-bg" class="card text-white bg-image shadow-4-strong"
          style="background-image: url('img/clouds.gif')">
          <!-- Main current data -->
          <div class="card-header p-4 border-0">
            <div class="text-center mb-3">
              <p class="h2 mb-1" id="wrapper-name"></p>
              <p class="mb-1" id="wrapper-description"></p>
              <p class="display-1 mb-1" id="wrapper-temp"></p>
              <span class="">Pressure: <span id="wrapper-pressure"></span></span>
              <span class="mx-2">|</span>
              <span class="">Humidity: <span id="wrapper-humidity"></span></span>
            </div>
          </div>

          <!-- Hourly forecast -->
          <div class="card-body p-4 border-top border-bottom mb-2">
            <div class="row text-center">
              <div class="col-2">
                <strong class="d-block mb-2">Now</strong>
                <img id="wrapper-icon-hour-now" src="" class="" alt="" />
                <strong class="d-block" id="wrapper-hour-now"></strong>
              </div>

              <div class="col-2">
                <strong class="d-block mb-2" id="wrapper-time1"></strong>
                <img id="wrapper-icon-hour1" src="" class="" alt="" />
                <strong class="d-block" id="wrapper-hour1"></strong>
              </div>

              <div class="col-2">
                <strong class="d-block mb-2" id="wrapper-time2"></strong>
                <img id="wrapper-icon-hour2" src="" class="" alt="" />
                <strong class="d-block" id="wrapper-hour2"></strong>
              </div>

              <div class="col-2">
                <strong class="d-block mb-2" id="wrapper-time3"></strong>
                <img id="wrapper-icon-hour3" src="" class="" alt="" />
                <strong class="d-block" id="wrapper-hour3"></strong>
              </div>

              <div class="col-2">
                <strong class="d-block mb-2" id="wrapper-time4"></strong>
                <img id="wrapper-icon-hour4" src="" class="" alt="" />
                <strong class="d-block" id="wrapper-hour4"></strong>
              </div>

              <div class="col-2">
                <strong class="d-block mb-2" id="wrapper-time5"></strong>
                <img id="wrapper-icon-hour5" src="" class="" alt="" />
                <strong class="d-block" id="wrapper-hour5"></strong>
              </div>
            </div>
          </div>

          <!-- Daily forecast -->
          <div class="card-body px-5">
            <div class="row align-items-center">
              <div class="col-lg-6">
                <strong>Today</strong>
              </div>

              <div class="col-lg-2 text-center">
                <img id="wrapper-icon-today" src="" class="w-100" alt="" />
              </div>

              <div class="col-lg-4 text-end">
                <span id="wrapper-forecast-temp-today"></span>
              </div>
            </div>

            <div class="row align-items-center">
              <div class="col-lg-6">
                <strong>Tomorrow</strong>
              </div>

              <div class="col-lg-2 text-center">
                <img id="wrapper-icon-tomorrow" src="" class="w-100" alt="" />
              </div>

              <div class="col-lg-4 text-end">
                <span id="wrapper-forecast-temp-tomorrow">28</span>
              </div>
            </div>

            <div class="row align-items-center">
              <div class="col-lg-6">
                <strong>Day after tomorrow</strong>
              </div>

              <div class="col-lg-2 text-center">
                <img id="wrapper-icon-dAT" src="" class="w-100" alt="" />
              </div>

              <div class="col-lg-4 text-end">
                <span id="wrapper-forecast-temp-dAT">28</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</section>

document.getElementById('fetchWeather').addEventListener('click', function() {
  const city = document.getElementById('cityInput').value;
  const apiKey = 'YOUR_API_KEY';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          const weather = `
              <h2>Weather in ${data.name}</h2>
              <p>Temperature: ${data.main.temp}°C</p>
              <p>Weather: ${data.weather[0].main}</p>
              <p>Humidity: ${data.main.humidity}%</p>
          `;
          document.getElementById('weatherResult').innerHTML = weather;
      })
      .catch(error => console.error('Failed to fetch data:', error));
});

fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Failed to fetch data:', error));

    document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('fetchWeather').addEventListener('click', function() {
          const city = document.getElementById('cityInput').value;
          const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
          fetchCityWeather(city, apiKey);
      });
  });
  
  function fetchCityWeather(city, apiKey) {
      // First, get the city's coordinates
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
          .then(response => response.json())
          .then(data => {
              // Use the coordinates to fetch comprehensive weather data using the One Call API
              const { lat, lon } = data.coord;
              fetchComprehensiveWeather(lat, lon, apiKey);
          })
          .catch(error => console.error('Failed to fetch city weather data:', error));
  }
  
  function fetchComprehensiveWeather(lat, lon, apiKey) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}&units=metric`)
          .then(response => response.json())
          .then(data => {
              displayCurrentWeather(data.current);
              displayHourlyForecast(data.hourly);
              displayDailyForecast(data.daily);
          })
          .catch(error => console.error('Failed to fetch comprehensive weather data:', error));
  }
  
  function displayCurrentWeather(currentWeather) {
      document.getElementById('wrapper-name').innerText = `Current Weather`;
      document.getElementById('wrapper-description').innerText = currentWeather.weather[0].description;
      document.getElementById('wrapper-temp').innerText = `${currentWeather.temp}°C`;
      document.getElementById('wrapper-pressure').innerText = `${currentWeather.pressure} hPa`;
      document.getElementById('wrapper-humidity').innerText = `${currentWeather.humidity}%`;
      document.getElementById('wrapper-icon-today').src = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`;
  }
  
  function displayHourlyForecast(hourlyForecast) {
      // Example: Displaying only the first 5 hours as a demonstration
      for (let i = 1; i <= 5; i++) {
          const forecast = hourlyForecast[i];
          document.getElementById(`wrapper-time${i}`).innerText = new Date(forecast.dt * 1000).getHours() + ":00";
          document.getElementById(`wrapper-icon-hour${i}`).src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
          document.getElementById(`wrapper-hour${i}`).innerText = `${forecast.temp}°C`;
      }
  }
  
  function displayDailyForecast(dailyForecast) {
      // Displaying today and tomorrow's forecast as a demonstration
      const todayForecast = dailyForecast[0];
      document.getElementById('wrapper-forecast-temp-today').innerText = `Max: ${todayForecast.temp.max}°C, Min: ${todayForecast.temp.min}°C`;
      document.getElementById('wrapper-icon-today').src = `http://openweathermap.org/img/wn/${todayForecast.weather[0].icon}.png`;
  
      const tomorrowForecast = dailyForecast[1];
      document.getElementById('wrapper-forecast-temp-tomorrow').innerText = `Max: ${tomorrowForecast.temp.max}°C, Min: ${tomorrowForecast.temp.min}°C`;
      document.getElementById('wrapper-icon-tomorrow').src = `http://openweathermap.org/img/wn/${tomorrowForecast.weather[0].icon}.png`;
  }
  
