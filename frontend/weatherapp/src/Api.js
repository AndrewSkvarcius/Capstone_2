// api.js
import axios from 'axios';

const apiKey = '0e6a428dcc9aca1970118a4c351a133a';
const baseURL = 'http://api.weatherstack.com/';

export const fetchWeatherData = async (location) => {
  try {
    const response = await axios.get(
      `${baseURL}/current?access_key=${apiKey}&query=${location}&units=f`
    );
    console.log("fetchweatherData", response.data)
    return response.data;
  
  } catch (error) {
    throw error;
  }
};

export const fetchForecastData = async (location, days = 7) => {
  try {
    const response = await axios.get(
      `${baseURL}/forecast?access_key=${apiKey}&query=${location}&forecast_days=${days}&units=f`
    );
    console.log("fetchForecastData", response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};
