// ForecastComponent.js
import React, { useState, useEffect } from 'react';
import { fetchForecastData } from './Api';

function WeatherForecast({ locationData }) {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        const response = await fetchForecastData(locationData.location.name);
        setForecastData(response.forecast);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchForecast();

    // Cleanup function
    return () => {
      // Any cleanup code
    };
  }, [locationData.location.name]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!forecastData) return null;

  return (
    <div>
      <h3>Forecast for {locationData.location.name}</h3>
      <ul>
        {forecastData.map((forecastDay, index) => (
          <li key={index}>
            <p>Date: {forecastDay.date}</p>
            <p>Max Temperature: {forecastDay.maxtemp_f} °F</p>
            <p>Min Temperature: {forecastDay.mintemp_f} °F</p>
            {/* Add more forecast details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeatherForecast;
