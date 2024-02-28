
//WeatherCard.js
import React, {useState, useEffect, useContext} from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { DateTime } from 'luxon';
import './WeatherCard.css';
import UserContext from "./auth/UserContext";
import { fetchForecastData } from './Api';
import ForecastComponent from './WeatherForecast';
import WeatherForecast from './WeatherForecast';




function WeatherCard({ locationData, favLocationId, onDelete }) {
  const [currentTime, setCurrentTime] = useState('');
  const [showForecast, setShowForecast] = useState(false); // State to toggle forecast display
  const { current } = locationData;
  const { currentUser,favoritesUpdated } = useContext(UserContext);


  useEffect(() => {
    const intervalId = setInterval(() => {
      // Calculate the current time for the specified timezone
      const currentTime = DateTime.now().setZone(locationData.location.timezone_id);
      setCurrentTime(currentTime.toFormat('h:mm a')); // Update the current time
    }, 1000); // Update every 1 second

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, [locationData.location.timezone_id]);

  const weatherConditionClass = `weather-card ${current.weather_descriptions[0].toLowerCase()}`;

  const toggleForecast = async () => {
    if (!showForecast) {
      try {
        setShowForecast(true);
        // Fetch forecast data when showing the forecast
        // Here, assuming locationData contains necessary information
        // Change accordingly if needed
        // Example: const forecastData = await fetchForecastData(locationData.location.name);
        // Update forecastData with the fetched data
      } catch (error) {
        console.error('Error fetching forecast data:', error);
        setShowForecast(false);
      }
    } else {
      setShowForecast(false);
    }
  };

  

  const handleDelete = async () => {
    // Directly call onDelete with the correct identifier or attributes
    // Example assuming you pass the correct identifier as a prop to WeatherCard
    console.log('Attempting to delete favLocationId:', favLocationId); // Debug log
    if (onDelete && favLocationId) {
      onDelete(favLocationId); // Adjust based on how you decide to pass the identifier
    } else {
      console.error("onDelete function not provided to WeatherCard");
    }
  };

return (
    <section>
      <Card className={weatherConditionClass}>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
         
          </CardTitle>
          <CardText className="font-italic"> </CardText>
          <h3>{locationData.location && locationData.location.name}, {locationData.location && locationData.location.country}</h3>
          <p>Current Time: {currentTime}</p>
          <p>Temperature: {locationData.current && locationData.current.temperature} °F</p>
          <p>Weather: {locationData.current && locationData.current.weather_descriptions && locationData.current.weather_descriptions[0]}</p>
          <Button className="delete-btn" onClick={handleDelete}>Delete</Button>
          <Button className="forecast-btn" onClick={toggleForecast}>Toggle Forecast</Button>
          {showForecast && <WeatherForecast locationData={locationData} />}
        </CardBody>
      </Card>
    </section>
  );
}

export default WeatherCard;
