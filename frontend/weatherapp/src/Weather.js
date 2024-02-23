import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from './Api';
import { Col, Row, Input } from 'reactstrap';
import WeatherCard from './WeatherCard'; // Import WeatherCard component

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');

  const getWeatherData = async () => {
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  useEffect(() => {
    if (location) {
      getWeatherData();
    }
  }, [location]);

  return (
    <div>
      <h1>Weather App</h1>
      <Row>
        <Col>
          <Input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Col>
      </Row>

      {weatherData && weatherData.location && (
        <WeatherCard locationData={weatherData} /> 
      )}
    </div>
  );
}

export default Weather;
