import React, { useState, useEffect, useCallback } from 'react';
import './Home.css';

const Home = () => {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');

  const apiKey = '2f6d0271796e5e201ed6f4ddc598ee08';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=`;

  const fetchWeatherData = useCallback(async (city) => {
    try {
      const response = await fetch(apiUrl + city);
      const data = await response.json();

      setCity(data.name);
      setTemperature(data.main.temp);
      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);

      const iconCode = data.weather[0].icon;
      setWeatherIcon(iconCode);

    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [apiUrl]);

  useEffect(() => {
    const searchBox = document.querySelector('.search input');
    const searchBtn = document.querySelector('.search button');
    const weatherIconElement = document.querySelector('.weathers-icon');

    const fetchData = async () => {
      await fetchWeatherData(searchBox.value);
    };

    searchBtn.addEventListener('click', fetchData);

    return () => {
      searchBtn.removeEventListener('click', fetchData);
    };
  }, [fetchWeatherData]);

  useEffect(() => {
    if (weatherIcon) {
      const weatherIconElement = document.querySelector('.weathers-icon');

      switch (weatherIcon) {
        case '01d':
        case '01n':
          weatherIconElement.src = '/images/clear.png';
          break;
        case '02d':
        case '02n':
        case '03d':
        case '03n':
        case '04d':
        case '04n':
          weatherIconElement.src = '/images/clouds.png';
          break;
        case '09d':
        case '09n':
        case '10d':
        case '10n':
          weatherIconElement.src = '/images/rain.png';
          break;
        default:
          weatherIconElement.src = '/images/default.png';
      }
    }
  }, [weatherIcon]);

  return (
    <div className='container-fluid weather'>
      <div className='card'>
        <div className='search'>
          <input type='text' placeholder='enter the city' spellCheck='false' />
          <button>
            <img src='/images/search.png' alt='' />
          </button>
        </div>
        <div className='weathers'>
          <img src={`/images/${weatherIcon}.png`} alt='' className='weathers-icon' />
          <h1 className='temp'>{temperature}°C</h1>
          <h2 className='city'>{city}</h2>
        </div>
        <div className='detail'>
          <div className='col'>
            <img src='/images/humidity.png' alt='' />
            <div>
              <p className='humidity'>{humidity} %</p>
              <p className='humi'>humidity</p>
            </div>
          </div>
          <div className='col'>
            <img src='/images/wind.png' alt='' />
            <div>
              <p className='wind'>{windSpeed} km/hr</p>
              <p className='speed'>wind speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
