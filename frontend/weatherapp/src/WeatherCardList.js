
import React, { useContext, useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import FavsApi from './FavsApi'; 
import { fetchWeatherData } from './Api';
import UserContext from "./auth/UserContext";
import './WeatherCardList.css';
import { CardBody, ListGroup, ListGroupItem } from 'reactstrap';


const WeatherCardList = () => {
  const { currentUser } = useContext(UserContext);
  const [favLocations, setFavLocations] = useState([]);
  const [locationWeatherData, setLocationWeatherData] = useState([]);

  useEffect(() => {
    const fetchAndSetFavLocations = async () => {
      if (currentUser && currentUser.id) {
        try {
          const fetchedFavLocations = await FavsApi.getFavsByUserId(currentUser.id);
          setFavLocations(fetchedFavLocations);

          // Fetch weather data for each favorite location
          const weatherDataPromises = fetchedFavLocations.map(favLocation =>
            fetchWeatherData(favLocation.location).then(weatherData => ({
              ...weatherData,
              favLocationId: favLocation.id, // Attach the favLocationId to the weather data
            }))
          );

          const weatherDataResults = await Promise.all(weatherDataPromises);
          setLocationWeatherData(weatherDataResults);
        } catch (error) {
          console.error("Error fetching favorite locations or weather data:", error);
        }
      }
    };

    fetchAndSetFavLocations();
  }, [currentUser]);

  const handleDeleteFavorite = async (favLocationId) => {
    try {
      console.log("favLocationId",favLocationId)
      await FavsApi.deleteFav(favLocationId);
   
      // Remove the deleted location from the state
      const updatedLocationWeatherData = locationWeatherData.filter(data => data.favLocationId !== favLocationId);
      setLocationWeatherData(updatedLocationWeatherData);
    } catch (error) {
      console.error("Failed to delete favorite location:", error);
    }
  };

  return (
    <section className="col-md-4">
      <CardBody>
        <h5>Weather List</h5>
        <ListGroup horizontal className="weather-card-list">
          {locationWeatherData.map((data, index) => (
            <ListGroupItem key={index}>
              <WeatherCard
                locationData={data}
                favLocationId={data.favLocationId} // Pass the favLocationId to the WeatherCard
                onDelete={handleDeleteFavorite}
              />
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </section>
  );
};

export default WeatherCardList;

