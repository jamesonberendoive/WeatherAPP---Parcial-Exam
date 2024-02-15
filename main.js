function getWeather() {
  const apiKey = "738e352f16a65a729377dc422f908d56";
  const city = document.getElementById("city-input").value;

  if (!city) return alert("Please enter a City!");

  // Fecthing the data from the URL
  const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&&appid=${apiKey}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=5&appid=${apiKey}`;

  fetch(currentWeatherURL)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((err) => {
      console.log("There is an error fetching the data ", err);
      alert("Error fetching weather data. Please try again!");
    });

  // Fetching the Forecast data
  fetch(forecastURL)
    .then((res) => res.json())
    .then((data) => {
      displayHourlyForecast(data.list);
      //displayDailyForecast(data.list);
    })
    .catch((err) => {
      console.log("Error fetching hourly data in forecast API", err);
      alert("Error fetching hourly data in forecast API");
    });
}

// Working on the HTML document
function displayWeather(data) {
  const tempDivInfo = document.getElementById("temp-div");
  const weatherInfoDiv = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

  // Clear previous content
  weatherInfoDiv.innerHTML = "";
  hourlyForecastDiv.innerHTML = "";
  tempDivInfo.innerHTML = "";

  if (data.cod === "404") {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    // Display city name and date
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHTML = `
    <p>${temperature}</p>`;

    const weatherHTML = `
    <p>${cityName}</p>
    <p>${description}</p>
    `;

    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHTML;
    weatherIcon.src = iconURL;
    weatherIcon.alt = description;

    showImage();
  }

  function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById("hourly-forecast");
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach((item) => {
      const dateTime = new Date(item.dt * 1000);
      const hour = dateTime.getHours();
      const temperature = Math.round(item.main.temp - 273.15);
      const iconCode = item.weather[0].icon;
      const iconImg = `https://openweathermap.org/img/wn/${iconCode}.png`;

      const hourlyItemHtml = `
      <div class="hourly-item">
      <span> ${hour}:00 </span>
        <img src="${iconURL}" alt=${item.weather[0].description}>
        <span> ${temperature} &#8451;</span>
      </div>`;

      hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
  }
}

function showImage() {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block";
}
