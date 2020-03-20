import dotenv from 'dotenv';

const environment = process.env.NODE_ENV;

if (environment !== 'production') {
  dotenv.config({
    path: '.env.local',
  });
}
