import React, { useEffect, useState, useContext } from 'react';
import FavsApi from './FavsApi'; 
import { fetchWeatherData } from './Api'; 
import AddFavLocationForm from './AddFavLocationForm';
import UserContext from "./auth/UserContext"; // Import your user context

const WeatherOfFavoriteLocations = () => {
  const [favLocations, setFavLocations] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const { currentUser } = useContext(UserContext); // Use currentUser from context
  const userId = currentUser.id;
  
  useEffect(() => {
    const fetchFavLocationsAndWeather = async () => {
      if (!currentUser || !currentUser.userId) return; // Guard clause if no currentUser or userId

      try {
        // Fetch favorite locations for the specific user
        const favsResponse = await FavsApi.getFavsByUserId(currentUser.id);
        const favs = favsResponse.favLocations || [];
        setFavLocations(favs);
        console.log("favLocations", favLocations)
        // Fetch weather data for each favorite location
        const weatherPromises = favs.map(location =>
          fetchWeatherData(location.location)
          .catch(error => ({ error: `Failed to fetch weather for ${location.location}: ${error.message}` }))
        );
        const weatherResults = await Promise.all(weatherPromises);

        // Map weather data to location
        const weatherDataMap = favs.reduce((acc, location, index) => {
          acc[location.location] = weatherResults[index];
          return acc;
        }, {});

        setWeatherData(weatherDataMap);
        console.log("weatherDataMap", weatherDataMap)
      } catch (error) {
        console.error("Failed to fetch favorite locations or weather data:", error);
      }
    };

    if (currentUser && currentUser.userId) {
      fetchFavLocationsAndWeather();
    }
  }, [currentUser]); // Depend on currentUser

  const handleAddFavorite = async (newLocation) => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    try {
      // Ensure addFav now expects a location and a userId
      const addedLocation = await FavsApi.addFav(newLocation, userId);
      setFavLocations(prevLocations => [...prevLocations, addedLocation]);
      
      // Fetch and display weather data for the new favorite location
      const weatherData = await fetchWeatherData(newLocation);
      setWeatherData(prevData => ({ ...prevData, [newLocation]: weatherData }));
    } catch (error) {
      console.error("Failed to add favorite location or fetch weather:", error);
    }
  };

  return (
    <div>

      <AddFavLocationForm onAdd={handleAddFavorite} />
      {favLocations.length === 0 ? (
        <p></p>
      ) : (
        favLocations.map(location => (
          // Add a conditional check to ensure location is not undefined and has an id property
          location && location.id ? (
            <div key={location.id}>
              <h3>{location.location}</h3>
              {weatherData[location.location] ? (
                <p>{weatherData[location.location].error || `Temperature: ${weatherData[location.location].temperature}°`}</p>
              ) : (
                <p>Loading weather data...</p>
              )}
            </div>
          ) : null // Render null if location is invalid
        ))
      )}
    </div>
  );
};

export default WeatherOfFavoriteLocations;
