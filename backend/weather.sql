\echo 'Delete and recreate weather db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE weather;
CREATE DATABASE weather;
\connect weather

\i weather-schema.sql
\i weather-seed.sql

\echo 'Delete and recreate weather_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE weather_test;
CREATE DATABASE weather_test;
\connect weather_test

\i weather-schema.sql
