# Capstone_2


API = weatherstack 
'http://api.weatherstack.com/';

Schema for Postgres database : Weather

users  table
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) UNIQUE NOT NULL, -- 'username' is unique but not a primary key
  password TEXT NOT NULL

favLocations table
  id SERIAL PRIMARY KEY,                 -- Unique primary key for the table
  user_id INTEGER REFERENCES users(id)   -- Foreign key referencing 'users' table
  ON DELETE CASCADE,
  location TEXT NOT NULL


schema cart
 https://lucid.app/lucidchart/57e2f672-30bf-442c-9e67-1b036425a1db/edit?viewport_loc=-1791%2C-235%2C2420%2C1206%2C0_0&invitationId=inv_46a63868-e3bf-4cb4-83d6-c84e1925bb8c



Weather Forecast Application
Insta Weather 

Description
The Weather Forecast Application is a web application that provides users with current weather information and forecasts for locations around the world. Users can search for a location and view its current weather conditions, including temperature, weather description, and current time. Additionally, users can add favorite locations then view the weather in those locations each time they log in.

Features
Current Weather Display: The application displays the current weather conditions for the selected location, including temperature, weather description, and current time.
Forecast Display: Users can toggle to view the forecast for the selected location, showing weather predictions for the upcoming days(needs higher api subscription level to be implemented).
Location Search: Users can search for a location by name or geographic coordinates to view its weather information.
Reasoning Behind Features
Current Weather Display: This feature provides users with immediate access to the most relevant weather information for their selected location.
Forecast Display: Forecasting allows users to plan ahead and make informed decisions based on future weather conditions(Once subscription is upgraded).
Location Search: Enabling users to search for locations enhances usability and provides flexibility in accessing weather information for different areas.
Favorite Locations: List of cards showing each location of users favorite locations.

User Flow
Sign up / Login: Username and password authentication used to load user favorite locations. 
Homepage: Upon visiting the website, users are presented with a search bar to input their desired location along with list of previous favorite locations that they can add or delete.
Search for Location: Users can enter the name or coordinates of the location they want to check the weather for.
View Current Weather: After selecting a location, users can view the current weather conditions displayed on the screen.
Toggle Forecast: Users have the option to toggle the display of the forecast for the selected location, showing weather predictions for the upcoming days.
API
The Weather Forecast Application utilizes the Weatherstack API to fetch weather data. This API provides current weather information for locations worldwide.

Technology Stack
Frontend: React.js, Reactstrap (Bootstrap for React)
Backend: Node.js , PSQL 
API: Weatherstack API
Deployment: GitHub Pages, Heroku 

Additional Notes

The application is responsive and optimized for various screen sizes, ensuring a seamless user experience across devices, along with different styling for various weather conditions.


Future enhancements may include adding more styling for all the different possible weather conditions and upgrading to the next level of service from the weatherstack api so that the 7 forecast can be implemented and recieve a response.





