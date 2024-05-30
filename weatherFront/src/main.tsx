import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css'; // Ensure this path is correct and the file exists

function City() {
  const [cityName, setCityName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [recentCities, setRecentCities] = useState<{ city: string, country: string }[]>([]);
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');

  const popularCities = [
    { city: 'London', country: 'UK' },
    { city: 'Paris', country: 'France' },
    { city: 'Tel Aviv', country: 'Israel' },
    { city: 'New York', country: 'US' },
    { city: 'Los Angeles', country: 'US' },
    { city: 'Rome', country: 'Italy' },
    { city: 'Berlin', country: 'Germany' },
    { city: 'Madrid', country: 'Spain' },
    { city: 'Amsterdam', country: 'Netherlands' },
  ];

  useEffect(() => {
    const storedCities = localStorage.getItem('recentCities');
    if (storedCities) {
      setRecentCities(JSON.parse(storedCities));
    }
  }, []);

  const fetchWeather = async (city: string, country: string, addToRecent = true) => {
    setError(null); // Clear previous error
    setWeatherData(null); // Clear previous weather data
    try {
      const response = await fetch(
        `http://localhost:3000/?city=${city}&country=${country}&units=${units}`, // Include units parameter
        {
          method: 'GET',
        }
      );
      if (!response.ok) {
        throw new Error('Incorrect City/Country name');
      }
      const data = await response.json();
      const { temp, temp_min, temp_max, humidity } = data.main; // Extract desired fields
      const { main } = data.weather[0];
      const { speed: wind_speed } = data.wind;
      setWeatherData({ temp, temp_min, temp_max, main, humidity, wind_speed });

      // Save the city and country to recent cities if addToRecent is true and it doesn't already exist
      if (addToRecent) {
        const newRecentCities = [...recentCities, { city, country }];
        setRecentCities(newRecentCities);
        localStorage.setItem('recentCities', JSON.stringify(newRecentCities));
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const cityExists = recentCities.some(recent => recent.city === cityName && recent.country === countryName);
    if (!cityExists) {
      fetchWeather(cityName, countryName, true);
    } else {
      fetchWeather(cityName, countryName, false);
    }
  };

  const handleRecentCityClick = (city: string, country: string) => {
    fetchWeather(city, country, false);
  };

  const handlePopularCityClick = (city: string, country: string) => {
    fetchWeather(city, country, false);
  };

  const handleReset = () => {
    setRecentCities([]);
    localStorage.removeItem('recentCities');
  };

  const handleUnitsToggle = () => {
    const newUnits = units === 'metric' ? 'imperial' : 'metric';
    setUnits(newUnits);
    if (cityName && countryName) {
      fetchWeather(cityName, countryName, false);
    }
  };

  const convertTemperature = (temp: number, units: string) => {
    if (units === 'metric') {
      return `${temp.toFixed(1)} °C`;
    } else {
      const fahrenheit = (temp * 9/5) + 32;
      return `${fahrenheit.toFixed(1)} °F`;
    }
  };

  const convertSpeed = (speed: number, units: string) => {
    if (units === 'metric') {
      return `${speed.toFixed(1)} m/s`;
    } else {
      const mph = speed * 2.237;
      return `${mph.toFixed(1)} mph`;
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Enter city name:</label>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Enter country name:</label>
          <input
            type="text"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
          />
        </div>
        <button type="submit">Get Weather</button>
        <button type="button" onClick={handleReset}>Reset Recent Cities</button>
      </form>
      <button type="button" onClick={handleUnitsToggle} className="units-toggle">
        Switch to {units === 'metric' ? 'Imperial' : 'Metric'}
      </button>
      {error && <div className="error">{error}</div>}
      {weatherData && (
        <div className="weather-data">
          <h3>Weather Data:</h3>
          <p>Main: {weatherData.main}</p>
          <p>Temperature: {convertTemperature(weatherData.temp, units)}</p>
          <p>Min Temperature: {convertTemperature(weatherData.temp_min, units)}</p>
          <p>Max Temperature: {convertTemperature(weatherData.temp_max, units)}</p>
          <p>Humidity: {weatherData.humidity} %</p>
          <p>Wind Speed: {convertSpeed(weatherData.wind_speed, units)}</p>
        </div>
      )}
      <div className="cities-container">
        <div className="popular-cities">
          <h3>Popular Cities:</h3>
          <ul>
            {popularCities.map((city, index) => (
              <li key={index} onClick={() => handlePopularCityClick(city.city, city.country)} style={{ cursor: 'pointer', color: 'blue' }}>
                {city.city}, {city.country}
              </li>
            ))}
          </ul>
        </div>
        {recentCities.length > 0 && (
          <div className="recent-cities">
            <h3>Recent Cities:</h3>
            <ul>
              {recentCities.map((city, index) => (
                <li key={index} onClick={() => handleRecentCityClick(city.city, city.country)} style={{ cursor: 'pointer', color: 'blue' }}>
                  {city.city}, {city.country}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<City />);
}

export default City;
