// api.js
import axios from 'axios';

const apiKey = '0e6a428dcc9aca1970118a4c351a133a';
const baseURL = 'http://api.weatherstack.com/';

export const fetchWeatherData = async (location) => {
  try {
    const response = await axios.get(
      `${baseURL}/current?access_key=${apiKey}&query=${location}&units=f`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
