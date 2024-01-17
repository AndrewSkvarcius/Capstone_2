DROP TABLE IF EXISTS favLocations;
DROP TABLE IF EXISTS users;



CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) UNIQUE NOT NULL, -- 'username' is unique but not a primary key
  password TEXT NOT NULL
);


CREATE TABLE favLocations (
  id SERIAL PRIMARY KEY,                 -- Unique primary key for the table
  user_id INTEGER REFERENCES users(id)   -- Foreign key referencing 'users' table
    ON DELETE CASCADE,
  location TEXT NOT NULL
);
