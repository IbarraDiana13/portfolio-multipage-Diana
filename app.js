const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

// Event listener for the search button
document.getElementById('search-btn').addEventListener('click', function() {
  const city = document.getElementById('city').value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert('Please enter a city name.');
  }
});

// Function to get weather information from the API
function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeather(data);
        document.getElementById('error-message').innerHTML = ''; // Clear previous errors
      } else {
        document.getElementById('weather-info').innerHTML = '';
        document.getElementById('error-message').innerHTML = `City "${city}" not found.`;
      }
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      document.getElementById('error-message').innerHTML = 'Error fetching weather data. Please try again.';
      document.getElementById('weather-info').innerHTML = '';
    });
}

// Function to display weather information on the page
function displayWeather(data) {
  const weatherInfo = document.getElementById('weather-info');
  const { name, main, weather, wind } = data;
  const { temp, humidity } = main;
  const { description, icon } = weather[0];
  const { speed } = wind;

  weatherInfo.innerHTML = `
    <div class="weather-details">
      <h3>Weather in ${name}</h3>
      <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
      <p><strong>${description}</strong></p>
      <p><strong>Temperature:</strong> ${temp}°C</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Wind Speed:</strong> ${speed} m/s</p>
    </div>
  `;
}
