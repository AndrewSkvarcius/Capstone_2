import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { DateTime } from 'luxon';
import './WeatherCard.css';



function WeatherCard({ locationData }) {
  const [currentTime, setCurrentTime] = useState('');
  const { current } = locationData;

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Calculate the current time for the specified timezone
      const currentTime = DateTime.now().setZone(locationData.location.timezone_id);
      setCurrentTime(currentTime.toFormat('h:mm:ss a')); // Update the current time
    }, 1000); // Update every 1 second

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, [locationData.location.timezone_id]);

  const weatherConditionClass = `weather-card ${current.weather_descriptions[0].toLowerCase()}`;

  
  
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
        </CardBody>
      </Card>
    </section>
  );
}

WeatherCard.propTypes = {
  locationData: PropTypes.shape({
    location: PropTypes.shape({
      name: PropTypes.string,
      country: PropTypes.string,
    }),
    current: PropTypes.shape({
      temperature: PropTypes.number,
      weather_descriptions: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
};

export default WeatherCard;
