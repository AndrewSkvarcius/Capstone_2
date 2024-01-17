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