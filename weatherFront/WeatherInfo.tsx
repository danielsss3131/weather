import React, { useState } from 'react';
import axios from 'axios';

const WeatherInfo: React.FC = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const getWeatherInfo = async () => {
    try {
      const response = await axios.get('http://localhost:3000/weather', {
        params: {
          city,
          country,
        },
      });
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError('Error retrieving weather data');
    }
  };

  return (
    <div>
      <h1>Weather Information</h1>
      <div>
        <label>
          City:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Country:
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
        </label>
      </div>
      <button onClick={getWeatherInfo}>Get Weather</button>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>Weather in {city}, {country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
