import React from 'react';
import WeatherCard from './WeatherCard';
import "./WeatherCardList.css";
import {
  Card,
  CardBody,
  ListGroup,
} from "reactstrap";

function WeatherCardList({ locationsData }) {

return (
  <section className="col-md-4">
   
      <CardBody>
        <ListGroup className="weather-card-list">
        {locationsData.map((locationData, index) => (
        <WeatherCard key={index} locationData={locationData} />
      ))}
        </ListGroup>
      </CardBody>
 
  </section>
);
}
export default WeatherCardList;
