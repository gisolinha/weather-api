const apiKey = 'd649dd4ed14745418e825550241111'; 
const getWeatherBtn = document.getElementById('getWeather');
const resetBtn = document.getElementById('reset');
const cityInput = document.getElementById('city');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const icon = document.getElementById('icon');
const weatherInfo = document.getElementById('weatherInfo');
const errorMessage = document.getElementById('errorMessage');

getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.error.message || 'City not found');
          });
        }
        return response.json();
      })
      .then(data => {
        // Exibe dados do clima
        weatherInfo.style.display = 'block';
        errorMessage.textContent = '';
        cityName.textContent = data.location.name;
        temperature.textContent = `Temperature: ${data.current.temp_c} °C`;
        description.textContent = data.current.condition.text;
        icon.src = `https:${data.current.condition.icon}`;
      })
      .catch(error => {
        // Mostra mensagem de erro
        errorMessage.textContent = error.message || 'city not found. please, please, please, try again.';
        weatherInfo.style.display = 'none';
      });
  } else {
    errorMessage.textContent = 'please, please, please, enter a city name.';
  }
});

resetBtn.addEventListener('click', () => {
  cityInput.value = '';
  weatherInfo.style.display = 'none';
  errorMessage.textContent = '';
});