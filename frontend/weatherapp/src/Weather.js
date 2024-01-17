import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from './Api';
import WeatherCardList from './WeatherCardList'; // Import the WeatherCardList component
import WeatherCard from './WeatherCard'; // Import the WeatherCard component
function Weather() {
    const [locations, setLocations] = useState([]); // Manage an array of locations
    const [locationInput, setLocationInput] = useState(''); // Manage the input for adding new locations
    const [weatherData, setWeatherData] = useState({}); // Store weather data for each location
  
    const addLocation = async () => {
      try {
        const data = await fetchWeatherData(locationInput);
        const timezone = data.location && data.location.timezone_id;
        setWeatherData({ ...weatherData, [locationInput]: data });
        setLocations([...locations, locationInput]);
        setLocationInput('');
      } catch (error) {
        console.error('Error fetching weather data', error);
      }
    };

    const handleDelete = (locationName) => {
        // Create a copy of the weatherData object without the specified location
        const updatedWeatherData = { ...weatherData };
        delete updatedWeatherData[locationName];
    
        // Create a copy of the locations array without the specified location
        const updatedLocations = locations.filter((location) => location !== locationName);
    
        setWeatherData(updatedWeatherData);
        setLocations(updatedLocations);
      };
  
    useEffect(() => {
      if (locations.length > 0) {
        // Fetch initial weather data for the first location when the component mounts
        addLocation();
      }
    }, []);
  
    return (
      <div>
        <h1>Your Locations</h1>
        <div>
          <input
            type="text"
            placeholder="Enter location"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />
          <button onClick={addLocation}>Add Location</button>
        </div>
        <WeatherCardList locationsData={Object.values(weatherData)} /> 
        
      </div>
    );
  }
  
  export default Weather;
  